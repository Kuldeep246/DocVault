import { auth, useUser } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";
import Dropzone from "@/components/Dropzone";

async function Dashboard() {
  const { userId } = auth();

  if (!userId) {
    return;
  }

  const docsResults = await getDocs(collection(db, "users", userId, "files"));


  const skeletonFile: FileType[] = docsResults.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      filename: data?.filename || doc.id,
      timestamp: data?.timestamp ? new Date(data.timestamp.seconds * 1000) : new Date(), // Provide a default value if timestamp is undefined
      fullName: data?.fullName || '',
      downloadURL: data?.downloadURL || '',
      type: data?.type || '',
      size: data?.size || 0,
    };
  });


  return (
    <div className="border-t">
      <Dropzone />

      <section className="container space-y-5">
        <h2 className="font-bold">All files</h2>
        <div>
          <TableWrapper
            skeletonFiles={skeletonFile}
          />
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
