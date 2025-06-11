import json
import boto3
import os
from datetime import datetime
from botocore.exceptions import ClientError

s3 = boto3.client('s3')
BUCKET_NAME = os.environ['BUCKET_NAME']
FILE_KEY = os.environ.get('FILE_KEY', 'submissions.jsonl')

def lambda_handler(event, context):
    method = event.get('requestContext', {}).get('http', {}).get('method', '')

    if method == 'OPTIONS':
        # Respond to CORS preflight requests
        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            'body': ''
        }

    try:
        body = json.loads(event['body'])

        entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "company": body.get("company"),
            "rating": body.get("rating"),
            "screen_result": body.get("screen_result"),
            "feedback": body.get("feedback"),
            "highlights": body.get("highlights"),
            "final_thoughts": body.get("final_thoughts")
        }

        try:
            response = s3.get_object(Bucket=BUCKET_NAME, Key=FILE_KEY)
            current_data = response['Body'].read().decode('utf-8')
        except ClientError as e:
            if e.response['Error']['Code'] == 'NoSuchKey':
                current_data = ""
            else:
                raise

        updated_data = current_data + json.dumps(entry) + "\n"
        s3.put_object(Bucket=BUCKET_NAME, Key=FILE_KEY, Body=updated_data.encode('utf-8'))

        return {
            'statusCode': 200,
            'headers': {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            'body': json.dumps({'message': 'Submission saved.'})
        }

    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                "Access-Control-Allow-Origin": "http://localhost:5173",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "POST, OPTIONS"
            },
            'body': json.dumps({'error': str(e)})
        }