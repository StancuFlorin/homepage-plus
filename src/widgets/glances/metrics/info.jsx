import { useTranslation } from "next-i18next";

import Block from "../components/block";
import Container from "../components/container";

import useWidgetAPI from "utils/proxy/use-widget-api";

function Swap({ quicklookData, className = "" }) {
  const { t } = useTranslation();

  return (
    quicklookData &&
    quicklookData.swap !== 0 && (
      <div className="text-xs flex place-content-between">
        <div className={className}>{t("glances.swap")}</div>
        <div className={className}>
          {t("common.number", {
            value: quicklookData.swap,
            style: "unit",
            unit: "percent",
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    )
  );
}

function CPU({ quicklookData, className = "" }) {
  const { t } = useTranslation();

  return (
    quicklookData &&
    quicklookData.cpu !== undefined &&
    quicklookData.cpu !== null && (
      <div className="text-xs flex place-content-between">
        <div className={className}>{t("glances.cpu")}</div>
        <div className={className}>
          {t("common.number", {
            value: quicklookData.cpu,
            style: "unit",
            unit: "percent",
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    )
  );
}

function Mem({ quicklookData, className = "" }) {
  const { t } = useTranslation();

  return (
    quicklookData &&
    quicklookData.mem && (
      <div className="text-xs flex place-content-between">
        <div className={className}>{t("glances.mem")}</div>
        <div className={className}>
          {t("common.number", {
            value: quicklookData.mem,
            style: "unit",
            unit: "percent",
            maximumFractionDigits: 0,
          })}
        </div>
      </div>
    )
  );
}

const defaultInterval = 1000;
const defaultSystemInterval = 30000; // This data (OS, hostname, distribution) is usually super stable.

export default function Component({ service }) {
  const { widget } = service;
  const { chart, refreshInterval = defaultInterval, version = 3 } = widget;

  const { data: quicklookData, errorL: quicklookError } = useWidgetAPI(service.widget, `${version}/quicklook`, {
    refreshInterval,
  });

  const { data: systemData, errorL: systemError } = useWidgetAPI(service.widget, `${version}/system`, {
    refreshInterval: defaultSystemInterval,
  });

  if (quicklookError || (quicklookData && quicklookData.error)) {
    const qlError = quicklookError || quicklookData.error;
    return <Container error={qlError} widget={widget} />;
  }

  if (systemError) {
    return <Container error={systemError} service={service} />;
  }

  const dataCharts = [];

  if (quicklookData) {
    quicklookData.percpu.forEach((cpu, index) => {
      dataCharts.push({
        name: `CPU ${index}`,
        cpu: cpu.total,
        mem: quicklookData.mem,
        swap: quicklookData.swap,
        proc: quicklookData.cpu,
      });
    });
  }

  return (
    <Container chart={chart}>
      {chart && (
        <div className="bg-linear-to-br from-theme-500/30 via-theme-600/20 to-theme-700/10 absolute -top-20 -left-2 -right-2 -bottom-2" />
      )}

      <Block position={chart ? "-top-6 right-2" : "top-3 right-2"}>
        {quicklookData && quicklookData.cpu_name && chart && (
          <div className="text-[0.6rem] opacity-50">{quicklookData.cpu_name}</div>
        )}

        {!chart && quicklookData?.swap === 0 && (
          <div className="text-[0.6rem] opacity-50">
            {systemData && systemData.linux_distro && `${systemData.linux_distro} - `}
            {systemData && systemData.os_version}
          </div>
        )}

        <div>{!chart && <Swap quicklookData={quicklookData} className="opacity-25 ml-2" />}</div>
      </Block>

      {chart && (
        <Block position="bottom-3 left-2">
          {systemData && systemData.linux_distro && <div className="text-xs opacity-50">{systemData.linux_distro}</div>}
          {systemData && systemData.os_version && <div className="text-xs opacity-50">{systemData.os_version}</div>}
          {systemData && systemData.hostname && <div className="text-xs opacity-75">{systemData.hostname}</div>}
        </Block>
      )}

      {!chart && (
        <Block position="bottom-3 left-3">
          <CPU quicklookData={quicklookData} className="opacity-75 mr-2" />
        </Block>
      )}

      <Block position="bottom-3 right-2">
        {chart && <CPU quicklookData={quicklookData} className="opacity-50 ml-2" />}

        {chart && <Mem quicklookData={quicklookData} className="opacity-50 ml-2" />}
        {!chart && <Mem quicklookData={quicklookData} className="opacity-75 ml-2" />}

        {chart && <Swap quicklookData={quicklookData} className="opacity-50 ml-2" />}
      </Block>
    </Container>
  );
}
