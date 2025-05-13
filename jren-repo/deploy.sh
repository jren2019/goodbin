rm -rf dist
npm run build:prod
aws s3 sync ./dist s3://www.goodbinsremovals.co.nz/
aws s3 sync ./dist s3://goodbinsremovals.co.nz/