
const cron = require('node-cron');
const Job = require('../models/Job');

const runCommand = async (job) => {
  console.log(`[${new Date().toLocaleTimeString()}] Executing Job: ${job.name}`);
  return true;
};

const checkDependencies = async (job) => {
  const allJobs = await Job.find({ _id: { $in: job.dependencies } });
  return allJobs.every(j => j.status === 'Success');
};

const scheduleJobs = async () => {
  cron.schedule('* * * * *', async () => {
    const jobs = await Job.find();
    const now = new Date();

    for (const job of jobs) {
      const shouldRun = job.nextRun && job.nextRun <= now;
      const depsSatisfied = await checkDependencies(job);

      if (shouldRun && depsSatisfied && job.status !== 'Running') {
        job.status = 'Running';
        await job.save();

        let success = false;
        let attempts = 0;

        while (attempts <= job.retry) {
          success = await runCommand(job);
          if (success) break;
          attempts++;
        }

        job.status = success ? 'Success' : 'Failed';

        if (job.schedule.startsWith('every')) {
          const minutes = parseInt(job.schedule.split(' ')[1]);
          job.nextRun = new Date(Date.now() + minutes * 60000);
        } else if (job.schedule.startsWith('daily')) {
          const [, timeStr] = job.schedule.split('at');
          const [hour, minute] = timeStr.trim().split(':').map(Number);
          const nextRun = new Date();
          nextRun.setHours(hour, minute, 0, 0);
          if (nextRun <= now) nextRun.setDate(nextRun.getDate() + 1);
          job.nextRun = nextRun;
        }

        await job.save();
      }
    }
  });
};

module.exports = { scheduleJobs };
