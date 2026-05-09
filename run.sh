podman stop $(podman ps -a -q)
podman rm $(podman ps -a -q)
podman rmi $(podman images -aq) -f
podman compose up -d --build