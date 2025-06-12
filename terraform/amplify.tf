resource "aws_amplify_app" "jeffjing" {
  name       = "jeffjing-dev"
  repository = "https://github.com/JeffreyJing/jeffjing.dev"
  oauth_token = var.github_token

  build_spec = <<YAML
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: build
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
    branch_name = "main"
    prefix      = ""  # root domain
  }

  sub_domain {
    branch_name = aws_amplify_branch.main.branch_name
    prefix      = "www"
  }

}