import { db } from "../init";
const cliProgress = require('cli-progress');
async function deleteCollection(collectionPath:string) {
  console.log(`deleting ${collectionPath} sample data`)
	const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
	bar.start(1, 0);
  const batchSize = 10;

  const snapshot = await db.collection(collectionPath).get();
  const tmp = await db.collection('cities').doc('DC')
  
  snapshot.forEach(async(doc) => {
    if(doc.data().id.includes("(test)_")){
      await db.collection(collectionPath).doc(doc.data().id).delete();
    }
  });


  bar.increment(1);
  bar.stop();
  return

}

export { deleteCollection };
