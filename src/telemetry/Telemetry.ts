import { SeverityNumber } from '@opentelemetry/api-logs';
import { LoggerProvider, BatchLogRecordProcessor } from '@opentelemetry/sdk-logs';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';

const collectorOptions = {
  url: 'http://172.26.190.16:3005/v1/logs', // url is optional and can be omitted - default is http://localhost:4318/v1/logs
  headers: {}, // an optional object containing custom headers to be sent with each request
  concurrencyLimit: 1, // an optional limit on pending requests
};

const logExporter = new OTLPLogExporter(collectorOptions);
const loggerProvider = new LoggerProvider({
  processors: [new BatchLogRecordProcessor(logExporter)]
});

const logger = loggerProvider.getLogger('default', '1.0.0');
// Emit a log
logger.emit({
  severityNumber: SeverityNumber.INFO,
  severityText: 'info',
  body: 'this is a log body',
  attributes: { 'log.type': 'custom' },
});


