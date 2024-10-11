import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface DownloadButtonProps {
  imageData: string;
  prompt: string;
}

export function DownloadButton({ imageData, prompt }: DownloadButtonProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${imageData}`;
    // Remove spaces and limit to 20 characters
    const filename = prompt.slice(0, 20).replace(/\s+/g, '_');
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      onClick={handleDownload}
      className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}