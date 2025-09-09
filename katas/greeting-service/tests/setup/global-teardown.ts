export default async function globalTeardown() {
  const container = (global as any).__TESTCONTAINER__;
  if (container) {
    console.log('Stopping test container...');
    await container.stop();
    console.log('Test container stopped');
  }
}