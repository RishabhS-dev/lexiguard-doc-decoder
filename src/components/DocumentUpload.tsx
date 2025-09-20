import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, Image, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  status: 'uploading' | 'analyzing' | 'complete' | 'error';
  progress: number;
}

export const DocumentUpload = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      processFiles(selectedFiles);
    }
  }, []);

  const processFiles = (fileList: File[]) => {
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 20 * 1024 * 1024; // 20MB

    fileList.forEach(file => {
      if (!validTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not supported. Please upload PDF or image files.`,
          variant: "destructive",
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 20MB limit.`,
          variant: "destructive",
        });
        return;
      }

      const newFile: UploadedFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploading',
        progress: 0,
      };

      setFiles(prev => [...prev, newFile]);
      simulateUpload(newFile.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    // Simulate upload progress
    let progress = 0;
    const uploadInterval = setInterval(() => {
      progress += Math.random() * 20;
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, progress: Math.min(progress, 100) }
          : file
      ));

      if (progress >= 100) {
        clearInterval(uploadInterval);
        // Switch to analyzing
        setFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, status: 'analyzing', progress: 0 }
            : file
        ));
        
        // Simulate analysis
        simulateAnalysis(fileId);
      }
    }, 200);
  };

  const simulateAnalysis = (fileId: string) => {
    let progress = 0;
    const analysisInterval = setInterval(() => {
      progress += Math.random() * 15;
      
      setFiles(prev => prev.map(file => 
        file.id === fileId 
          ? { ...file, progress: Math.min(progress, 100) }
          : file
      ));

      if (progress >= 100) {
        clearInterval(analysisInterval);
        setFiles(prev => prev.map(file => 
          file.id === fileId 
            ? { ...file, status: 'complete', progress: 100 }
            : file
        ));
        
        toast({
          title: "Analysis complete!",
          description: "Your document has been analyzed successfully.",
        });
      }
    }, 300);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Upload Your Legal Document
            </h2>
            <p className="text-lg text-muted-foreground">
              Drag & drop or click to upload PDF files, scanned documents, or images
            </p>
          </div>

          {/* Upload Area */}
          <Card 
            className={`relative border-2 border-dashed transition-all duration-300 ${
              isDragOver 
                ? 'border-primary bg-primary/5 shadow-glow-primary' 
                : 'border-border hover:border-primary/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="p-12 text-center">
              <div className="w-16 h-16 bg-hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-primary-foreground" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">Drop files here</h3>
              <p className="text-muted-foreground mb-6">
                or click to browse from your computer
              </p>
              
              <input
                type="file"
                id="file-upload"
                className="hidden"
                multiple
                accept=".pdf,image/*"
                onChange={handleFileSelect}
              />
              
              <Button 
                variant="hero" 
                size="lg"
                asChild
              >
                <label htmlFor="file-upload" className="cursor-pointer">
                  Choose Files
                </label>
              </Button>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Supported formats: PDF, JPG, PNG • Max size: 20MB per file</p>
              </div>
            </div>
          </Card>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Processing Files</h3>
              
              {files.map((file) => (
                <Card key={file.id} className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      {file.type === 'application/pdf' ? (
                        <FileText className="w-8 h-8 text-danger" />
                      ) : (
                        <Image className="w-8 h-8 text-success" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium truncate">{file.name}</p>
                        <span className="text-sm text-muted-foreground">
                          {formatFileSize(file.size)}
                        </span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">
                            {file.status === 'uploading' && 'Uploading...'}
                            {file.status === 'analyzing' && 'Analyzing with AI...'}
                            {file.status === 'complete' && 'Analysis complete'}
                            {file.status === 'error' && 'Error processing file'}
                          </span>
                          <span className="text-muted-foreground">
                            {file.progress.toFixed(0)}%
                          </span>
                        </div>
                        
                        <Progress 
                          value={file.progress} 
                          className="h-2"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-shrink-0">
                      {file.status === 'complete' && (
                        <Button variant="success" size="sm">
                          View Analysis
                        </Button>
                      )}
                      {file.status === 'error' && (
                        <AlertCircle className="w-5 h-5 text-danger" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};