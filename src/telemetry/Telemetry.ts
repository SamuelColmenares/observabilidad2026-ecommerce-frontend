import { SeverityNumber } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  BatchLogRecordProcessor,
  LoggerProvider,
} from "@opentelemetry/sdk-logs";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
const opentelemetry = require('@opentelemetry/api');
import { TelemetryAttributes } from "./TelemetryAttributes";
import { MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';

interface TelemetrySettings {
  url: string;
  headers?: Record<string, string>;
  concurrencyLimit?: number;
}

export class TelemetryManager {
  logExporter: OTLPLogExporter;
  resource: ReturnType<typeof resourceFromAttributes>;
  loggerProvider: LoggerProvider;
  logger: ReturnType<LoggerProvider["getLogger"]>;

  constructor(settings: TelemetrySettings) {
    this.logExporter = new OTLPLogExporter(settings);
    this.resource = resourceFromAttributes({
      [ATTR_SERVICE_NAME]: "accenture-market-place-observability-2026",
      [ATTR_SERVICE_VERSION]: "1.0.0",
    });
    this.loggerProvider = new LoggerProvider({
      resource: this.resource,
      processors: [new BatchLogRecordProcessor(this.logExporter)],
    });
    this.logger = this.loggerProvider.getLogger("ecommerce-app");
  }

  logInfo(message: string, attributes?: Record<string, unknown>) {
    this.logger.emit({
      severityNumber: SeverityNumber.INFO,
      severityText: "info",
      body: message,
      attributes: { "log.type": "custom", ...attributes },
    });
  }

   logError(message: string, attributes?: Record<string, unknown>) {
    this.logger.emit({
      severityNumber: SeverityNumber.ERROR,
      severityText: "error",
      body: message,
      attributes: { "log.type": "custom", ...attributes },
    });
  }
}

// TelemetryAttributes.APP_INITIALIZED,
