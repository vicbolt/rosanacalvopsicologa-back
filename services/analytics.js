// services/analytics.service.js
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const client = new BetaAnalyticsDataClient();
const propertyId = '486362533';

export async function getTotalUsers() {
  const [response] = await client.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '2024-04-01', endDate: 'today' }],
    metrics: [{ name: 'activeUsers' }],
  });

  return response.rows[0].metricValues[0].value;
}
