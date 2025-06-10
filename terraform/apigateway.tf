# Create REST API
resource "aws_api_gateway_rest_api" "form_api" {
  name = "form-api-rest"
}

# Root resource ID ("/")
data "aws_api_gateway_resource" "root" {
  rest_api_id = aws_api_gateway_rest_api.form_api.id
  path        = "/"
}

# Create /submit resource
resource "aws_api_gateway_resource" "submit" {
  rest_api_id = aws_api_gateway_rest_api.form_api.id
  parent_id   = data.aws_api_gateway_resource.root.id
  path_part   = "submit"
}

# POST method on /submit
resource "aws_api_gateway_method" "post_submit" {
  rest_api_id   = aws_api_gateway_rest_api.form_api.id
  resource_id   = aws_api_gateway_resource.submit.id
  http_method   = "POST"
  authorization = "NONE"
}

# OPTIONS method on /submit for CORS preflight
resource "aws_api_gateway_method" "options_submit" {
  rest_api_id   = aws_api_gateway_rest_api.form_api.id
  resource_id   = aws_api_gateway_resource.submit.id
  http_method   = "OPTIONS"
  authorization = "NONE"
}

# Lambda integration for POST
resource "aws_api_gateway_integration" "post_lambda" {
  rest_api_id             = aws_api_gateway_rest_api.form_api.id
  resource_id             = aws_api_gateway_resource.submit.id
  http_method             = aws_api_gateway_method.post_submit.http_method
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.form_handler.invoke_arn
}

# Mock integration for OPTIONS to handle CORS preflight
resource "aws_api_gateway_integration" "options_mock" {
  rest_api_id             = aws_api_gateway_rest_api.form_api.id
  resource_id             = aws_api_gateway_resource.submit.id
  http_method             = aws_api_gateway_method.options_submit.http_method
  type                    = "MOCK"

  request_templates = {
    "application/json" = "{\"statusCode\": 200}"
  }
}

# Method response for OPTIONS
resource "aws_api_gateway_method_response" "options_response" {
  rest_api_id = aws_api_gateway_rest_api.form_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.options_submit.http_method
  status_code = "200"

  response_models = {
    "application/json" = "Empty"
  }

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = true
    "method.response.header.Access-Control-Allow-Methods" = true
    "method.response.header.Access-Control-Allow-Origin"  = true
  }
}

# Integration response for OPTIONS
resource "aws_api_gateway_integration_response" "options_integration_response" {
  rest_api_id = aws_api_gateway_rest_api.form_api.id
  resource_id = aws_api_gateway_resource.submit.id
  http_method = aws_api_gateway_method.options_submit.http_method
  status_code = aws_api_gateway_method_response.options_response.status_code

  response_parameters = {
    "method.response.header.Access-Control-Allow-Headers" = "'Content-Type,X-Amz-Date,Authorization,X-Api-Key'"
    "method.response.header.Access-Control-Allow-Methods" = "'POST,OPTIONS'"
    "method.response.header.Access-Control-Allow-Origin"  = "'*'"
  }

  response_templates = {
    "application/json" = ""
  }
}

# Deployment
resource "aws_api_gateway_deployment" "deployment" {
  depends_on = [
    aws_api_gateway_integration.post_lambda,
    aws_api_gateway_integration.options_mock
  ]

  rest_api_id = aws_api_gateway_rest_api.form_api.id
}

# Permission for Lambda to be invoked by API Gateway
resource "aws_lambda_permission" "api_gateway" {
  statement_id  = "AllowAPIGatewayInvoke-v2"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.form_handler.function_name
  principal     = "apigateway.amazonaws.com"

  source_arn = "${aws_api_gateway_rest_api.form_api.execution_arn}/*/*"
}

resource "aws_api_gateway_stage" "prod" {
  stage_name    = "prod"
  rest_api_id   = aws_api_gateway_rest_api.form_api.id
  deployment_id = aws_api_gateway_deployment.deployment.id
}
