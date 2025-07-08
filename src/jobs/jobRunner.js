// src/jobs/jobRunner.js
// Central scheduler/runner for background jobs
const cron = require('node-cron');
const runSettlementJob = require('./settlement.job');
const runNotificationJob = require('./notification.job');
const runReconciliationJob = require('./reconciliation.job');
const runRetryFailedTransactionsJob = require('./retryFailedTransactions.job');

// Schedule jobs (customize cron expressions as needed)
cron.schedule('0 0 * * *', runSettlementJob); // Every day at midnight
cron.schedule('*/10 * * * *', runNotificationJob); // Every 10 minutes
cron.schedule('0 1 * * *', runReconciliationJob); // Every day at 1am
cron.schedule('*/30 * * * *', runRetryFailedTransactionsJob); // Every 30 minutes

console.log('Job runner started. Scheduled all jobs.');
