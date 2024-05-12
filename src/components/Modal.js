import React, { useRef } from "react";

export default function Modal({ trailerSrc, trailerTitle }) {
    const dialogRef=useRef(null);
  // "Close" button closes the dialog
  function handleClick(action) {
    action === 'open' && dialogRef.current ? dialogRef.current.showModal() : dialogRef.current.close();
  }

  return (
    <>
      <dialog ref={dialogRef} >
        <button  type="button" onClick={() => handleClick("close")} autoFocus >
          Close
        </button>
        <iframe
          width="160"
          height="90"
          src={trailerSrc}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </dialog>
      <button onClick={() => handleClick("open")} type="button" title={trailerTitle}><i className="bi bi-youtube"></i><span className="screen-reader-text">Watch {trailerTitle}</span></button>
    </>
  );
}
