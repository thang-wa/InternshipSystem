import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { DialogTrigger } from "@/components/ui/dialog";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogTitle } from "@radix-ui/react-dialog";
import { firestore, storage } from "../../firebase/firebase";

import { getDownloadURL } from "firebase/storage";
import { useState } from "react";
import uuid4 from "uuid4";

export default function NestedModal({ btnName, job, currentuser }) {
  const [file, setFile] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (EmailData) => {
    console.log(EmailData);
  };
  const handleFileChange = (event) => {
    const filecv = event.target.files[0];
    console.log(filecv);
    setFile(filecv);
  };
  const Submit = () => {
    setLoading(true);
    const uid = uuid4();
    const userID = currentuser.uid;
    if (file) {
      const post = storage.ref(
        "applications/" + job.uid + "/" + currentuser.uid + "/" + "resume"
      );
      post.put(file).then((snapshot) => {
        firestore.collection("applications").doc(uid).set({
          uid,
          userID: userID,
          jobID: job.uid,
          status: "pending",
          coverLetter: coverLetter,
          file: currentuser.resume,
        });
      });
    } else {
      const post = storage.ref(
        "applications/" + job.uid + "/" + currentuser.uid + "/" + "resume"
      );
      post.put(file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          firestore.collection("applications").doc(uid).set({
            uid,
            userID: userID,
            jobID: job.uid,
            status: "pending",
            coverLetter: coverLetter,
            file: url,
          });
        });
      });
    }
    setLoading(false);
    // add navigation to the job page
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="primary"
            className="w-1/5 hover:scale-105 bg-pink_red text-white text-xl px-2 mt-10"
          >
            {btnName}
          </Button>
        </DialogTrigger>

        <DialogContent className="fixed h-auto left-[50%] top-[50%] z-50 grid w-full max-w-7xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg ">
          <DialogHeader className="">
            <DialogTitle className="text-4xl font-bold leading-tight text-zinc-900">
              {`Apply to ${job.title}?`}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-10 h-auto w-full ">
            <p className="font-medium text-xl text-center">
              Write a cover letter to the employer highlighting your skills and
              why you&apos;re perfect for this position
            </p>
            <div className="my-4 mx-10 border-b border-gray-300"></div>
            <div className="h-[20rem]">
              <Textarea
                onChange={(e) => setCoverLetter(e.target.value)}
                className="h-full"
                placeholder="Type your cover letter here."
              />
            </div>

            <div className="">
              <p className="mt-10 font-medium">
                Would you like to upload a new resume? (optional)
              </p>
              <Input
                id="Resume"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
            </div>
            <Button
              onClick={Submit}
              variant="primary"
              className="w-1/5 hover:scale-105 bg-pink_red text-white text-xl px-2 mt-10"
            >
              {loading ? "Loading..." : "Submit"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
