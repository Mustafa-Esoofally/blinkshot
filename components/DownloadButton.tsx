import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { saveAs } from 'file-saver';

interface DownloadButtonProps {
  imageData: string;
  prompt?: string;
}

export default function DownloadButton({ imageData, prompt = '' }: DownloadButtonProps) {
  const handleDownload = () => {
    const byteString = atob(imageData);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: 'image/png' });
    
    // Generate a filename based on the prompt or use a default name
    const filename = prompt
      ? `${prompt.slice(0, 20).replace(/[^a-z0-9]/gi, '_').toLowerCase()}_${Date.now()}.png`
      : `generated_image_${Date.now()}.png`;
    
    saveAs(blob, filename);
  };

  return (
    <Button
      onClick={handleDownload}
      className="absolute top-4 right-4 bg-gray-800 bg-opacity-50 text-white hover:bg-gray-700 hover:bg-opacity-70 transition-colors !important"
      variant="ghost"
    >
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  );
}