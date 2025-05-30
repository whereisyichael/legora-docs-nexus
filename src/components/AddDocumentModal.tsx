
import React, { useState } from 'react';
import { Upload, Scan, FolderOpen, X, Cloud, Building2, Link, Mail } from 'lucide-react';
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
          <h3 className="font-semibold">Add New Document</h3>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <div className="p-6 space-y-4">
          {/* Drag and Drop Area */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Drag and drop files here</p>
            <p className="text-sm text-gray-500">or choose from the options below</p>
          </div>

          {/* Upload Options */}
          <div className="space-y-3">
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

          {/* Quick Actions */}
          <div className="pt-4 border-t">
            <p className="text-sm font-medium text-gray-700 mb-3">Quick Actions</p>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-sm">
                Create new contract from template
              </Button>
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
