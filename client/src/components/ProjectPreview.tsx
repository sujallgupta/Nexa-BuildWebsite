import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { Project } from "../types";
import { iframeScript } from "../assets/assets";
import EditorPanel from "./EditorPanel";
import LoaderSteps from "./LoaderSteps";

interface ProjectPreviewProps {
  project: Project;
  isGenerating?: boolean;
  device?: "phone" | "tablet" | "desktop";
  showEditorPanel?: boolean;
}

export interface ProjectPreviewRef {
  getCode: () => string | undefined;
}

const ProjectPreview = forwardRef<ProjectPreviewRef, ProjectPreviewProps>(
  (
    { project, isGenerating, device = "desktop", showEditorPanel = true },
    ref
  ) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const resolutions = {
      phone: "w-[412px]",
      tablet: "w-[768px]",
      desktop: "w-full",
    };

    useImperativeHandle(ref,()=>({
      getCode:()=>{
        const doc = iframeRef.current?.contentDocument;
        if(!doc) return undefined;
        //1. Remove our selection class/attributes/outline from all elements
        doc.querySelectorAll('.ai-selected-element,[data-ai-selected]').forEach((el)=>{
          el.classList.remove('ai-selected-element')
          el.removeAttribute('data-ai-selected');
          (el as HTMLElement).style.outline = '';
        })
        // 2. Remove injected Style + Script from document
        const previewStyle = doc.getElementById('ai-preview-style');
        if(previewStyle)previewStyle.remove();

        const previewScript = doc.getElementById('ai-preview-script');
        if(previewScript)previewScript.remove();

        // 3. Serialize clean HTML
        const html = doc.documentElement.outerHTML;
        return html;


      }
    }))

    const [selectedElement, setSelectedElement] = useState<any>(null);
    useEffect(() => {
      const handleMessage = (event: MessageEvent) => {
        if (event.data.type === "ELEMENT_SELECTED") {
          setSelectedElement(event.data.payload);
        } else if (event.data.type === "CLEAR_SELECTION") {
          setSelectedElement(null);
        }
      };
      window.addEventListener("message", handleMessage);
      return () => window.removeEventListener("message", handleMessage);
    }, []);
    const handleUpdate = (updates: any) => {
      if (iframeRef.current?.contentWindow) {
        iframeRef.current.contentWindow.postMessage(
          { type: "UPDATE_ELEMENT", payload: updates },
          "*"
        );
      }
    };
    const injectPreview = (html: string) => {
      if (!html) return "";
      if (!showEditorPanel) return html;

      if (html.includes("</body>")) {
        return html.replace("</body>", iframeScript + "</body>");
      } else {
        return html + iframeScript;
      }
    };


//       <div className="relative w-full h-full bg-[#050713] rounded-2xl overflow-hidden flex items-center justify-center">


//         {project.current_code ? (
//           <>
//             <iframe
//               ref={iframeRef}
//               srcDoc={injectPreview(project.current_code)}
//               className={`h-full max-sm:w-full ${resolutions[device]} mx-auto transition-all `}
//             />

//             {showEditorPanel && selectedElement && (
//               <EditorPanel
//                 selectedElement={selectedElement}
//                 onUpdate={handleUpdate}
//                 onClose={() => {
//                   setSelectedElement(null);
//                   if (iframeRef.current?.contentWindow) {
//                     iframeRef.current.contentWindow.postMessage(
//                       { type: "CLEAR_SELECTION_REQUEST" },
//                       "*"
//                     );
//                   }
//                 }}
//               />
//             )}
//           </>
//         ) : (
//           isGenerating && <div className="w-full h-full flex items-center justify-center"><LoaderSteps /></div>
//         )}
//       </div>
//     );
//   }
// );
return (
  <div
    className={`relative w-full h-full min-h-full bg-gray-900 flex-1 overflow-hidden max-sm:ml-2 flex ${
      device === "desktop" ? "items-stretch justify-start" : "items-center justify-center"
    }`}
  >
    {project.current_code ? (
      <>
        <iframe
          ref={iframeRef}
          srcDoc={injectPreview(project.current_code)}
          className={`h-full transition-all duration-300 ease-in-out border-0 ${
            device === "desktop"
              ? "w-full"
              : `${resolutions[device]} shadow-2xl rounded-xl`
          }`}
        />
       


        {showEditorPanel && selectedElement && (
          <EditorPanel
            selectedElement={selectedElement}
            onUpdate={handleUpdate}
            onClose={() => {
              setSelectedElement(null);
              iframeRef.current?.contentWindow?.postMessage(
                { type: "CLEAR_SELECTION_REQUEST" },
                "*"
              );
            }}
          />
        )}
      </>
    ) : (
      isGenerating && (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderSteps />
        </div>
      )
    )}
  </div>
);
  }
)
export default ProjectPreview;
