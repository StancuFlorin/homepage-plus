# 🚀 Homepage+

This is a custom fork of the original [stancuflorin/homepage-plus](https://github.com/stancuflorin/homepage-plus) project, with additional functionality extending beyond the scope of the original project.

> **Docker Image**:
> 🐳 `ghcr.io/stancuflorin/homepage-plus:dev`

## ✨ What's New in This Fork

[Docker Container Actions](https://stancuflorin.github.io/homepage-plus/configs/settings/#show-container-actions) - it allows users to start / restart / stop Docker containers **directly from the homepage interface**.

![Docker Commands](images/plus/docker-container-actions.png)

## 📦 Why This Fork?

The original `homepage` project is intentionally **read-only by design**. The maintainers aim to avoid adding features that alter system state or introduce complex edge cases (like full Kubernetes support).

This fork breaks that limitation to provide more control and usability for users who want **lightweight container management** directly from their dashboard.

## 🚀 Getting Started

Run the fork using Docker:

```bash
docker run -d \
  -p 3000:3000 \
  -v /var/run/docker.sock:/var/run/docker.sock \
  ghcr.io/stancuflorin/homepage-plus:dev
```

> **Note:** Mounting the Docker socket is required for container control features.

## 📖 Documentation

All base functionality and configuration are inherited from the upstream project. For general usage, refer to the [original Homepage documentation](https://gethomepage.dev/).

Only the **container management** feature is added on top.

## 🤝 Acknowledgments

Thanks to the maintainers of the original [Homepage project](https://github.com/stancuflorin/homepage-plus) for building an awesome and extensible dashboard.
