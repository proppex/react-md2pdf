const fs = require('fs');
const summaryPath = 'coverage/coverage-summary.json';
if (!fs.existsSync(summaryPath)) {
  console.error('Coverage summary not found');
  process.exit(1);
}
const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const pct = summary.total.lines.pct;
function colorFor(pct) {
  if (pct >= 90) return 'brightgreen';
  if (pct >= 80) return 'green';
  if (pct >= 70) return 'yellowgreen';
  if (pct >= 60) return 'yellow';
  if (pct >= 50) return 'orange';
  return 'red';
}
const badge = {
  schemaVersion: 1,
  label: 'coverage',
  message: pct + '%',
  color: colorFor(pct)
};
fs.mkdirSync('.github/badges', { recursive: true });
fs.writeFileSync('.github/badges/coverage.json', JSON.stringify(badge));
