import { db } from "../init";
const cliProgress = require('cli-progress');
async function deleteCollection(collectionPath:string) {
  console.log(`deleting ${collectionPath} sample data`)
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(1, 0);
  const batchSize = 10;

  const collectionRef = db.collection(collectionPath).limit(batchSize);
  const query = collectionRef
  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve, bar).catch(reject);
  });

}

async function deleteQueryBatch(db: any, query: any, resolve: any, bar:any) {
  const snapshot = await query.get();
  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    bar.increment(1);
    bar.stop();
    return;
  }

  // Delete documents in a batch
  const batch = db.batch();
  snapshot.docs.forEach((doc: any) => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve, bar);
  });
}
export { deleteCollection };
