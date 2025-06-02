
import React, { useState } from 'react';
import { Upload, Scan, FolderOpen, X, Cloud, Building2, Link, Mail, FileText, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddDocumentModal = ({ isOpen, onClose }: AddDocumentModalProps) => {
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 max-w-[90vw]">
        <div className="p-4 border-b flex items-center justify-between">
          <h3 className="font-semibold">New Document</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Document Creation Section - Priority 1 */}
          <div>
            <p className="text-sm font-medium text-gray-700 mb-3">Create Documents</p>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileText className="w-4 h-4 mr-3" />
                Create new document
              </Button>
              
              {/* AI Suggestions */}
              <Button variant="outline" className="w-full justify-start text-left">
                <Sparkles className="w-4 h-4 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="text-sm">Create new NDA agreement with Summit Capital</div>
                  <div className="text-xs text-gray-500">Meeting scheduled for tomorrow</div>
                </div>
              </Button>
              
              <Button variant="outline" className="w-full justify-start text-left">
                <Sparkles className="w-4 h-4 mr-3 text-blue-500" />
                <div className="text-left">
                  <div className="text-sm">Draft employment contract for new hire</div>
                  <div className="text-xs text-gray-500">Based on recent HR request</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Import/Add Documents Section - Priority 2 */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-3">Import & Add Documents</p>
            
            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors mb-4 ${
                dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <FolderOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Drag and drop files here</p>
              <p className="text-xs text-gray-500">or choose from options below</p>
            </div>

            {/* Upload Options */}
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="w-4 h-4 mr-3" />
                Upload Files
              </Button>
              
              <Button variant="outline" className="w-full justify-start">
                <Scan className="w-4 h-4 mr-3" />
                Scan Document
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Cloud className="w-4 h-4 mr-3" />
                Import from Google Drive
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-3" />
                Import from iManage
              </Button>

              <Button variant="outline" className="w-full justify-start">
                <Building2 className="w-4 h-4 mr-3" />
                Import from NetDocuments
              </Button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions</p>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                Import from email
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                <Link className="w-4 h-4 mr-2" />
                Create upload link for clients
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddDocumentModal;
