/* eslint-disable no-void */
import { ServerApplication } from './application/server';

async function runApplication(): Promise<void> {
  const serverApplication: ServerApplication = ServerApplication.new();
  await serverApplication.run();
}

void runApplication();
