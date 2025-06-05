resource "aws_amplify_app" "jeffjing" {
  name       = "jeffjing-dev"
  repository = "https://github.com/JeffreyJing/jeffjing.dev"
  oauth_token = var.github_token  # manually generated and stored in Terraform variable
  iam_service_role_arn = aws_iam_role.amplify_service_role.arn

  build_spec = <<YAML
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd site
        - npm ci || true
    build:
      commands:
        - npm run build || true
  artifacts:
    baseDirectory: site/build
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
YAML
}

resource "aws_amplify_branch" "main" {
  app_id      = aws_amplify_app.jeffjing.id
  branch_name = "main"
}

resource "aws_amplify_domain_association" "custom_domain" {
  app_id      = aws_amplify_app.jeffjing.id
  domain_name = "jeffjing.dev"

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "" # root domain
  }
}