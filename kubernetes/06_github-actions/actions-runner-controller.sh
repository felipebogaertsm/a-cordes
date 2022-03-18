# Source: https://medium.com/geekculture/github-actions-self-hosted-runner-on-kubernetes-55d077520a31

# Add repository
helm repo add actions-runner-controller https://actions-runner-controller.github.io/actions-runner-controller
# Install chart
helm install -f kubernetes/06_github-actions/secret.yaml --wait --namespace actions-runner-system --create-namespace actions-runner-controller actions-runner-controller/actions-runner-controller
# Verify installation
kubectl --namespace actions-runner-system get all