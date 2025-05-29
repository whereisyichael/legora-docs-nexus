
import React, { useState } from 'react';
import { ArrowLeft, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, FileText, Clock, MessageSquare, X, Download, Share2, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

interface DocumentEditorProps {
  document: any;
  onClose: () => void;
}

const DocumentEditor = ({ document, onClose }: DocumentEditorProps) => {
  const [message, setMessage] = useState('');

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Top Bar */}
      <div className="h-16 border-b flex items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={onClose}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="font-semibold">{document.name}</h1>
            <p className="text-sm text-gray-600">{document.type}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download
          </Button>
          <Button variant="outline" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Document Editor */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="h-12 border-b flex items-center px-6 space-x-1">
            <Button variant="ghost" size="sm">
              <Bold className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Italic className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Underline className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm">
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <AlignRight className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="ghost" size="sm">
              <List className="w-4 h-4" />
            </Button>
            <Separator orientation="vertical" className="h-6 mx-2" />
            <Button variant="outline" size="sm">
              <Clock className="w-4 h-4 mr-2" />
              Version History
            </Button>
          </div>

          {/* Document Content */}
          <div className="flex-1 p-6 overflow-auto bg-gray-50">
            <div className="max-w-4xl mx-auto bg-white shadow-sm border rounded-lg p-8 min-h-full">
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">LIMITED PARTNERSHIP AGREEMENT</h2>
                <p className="text-gray-700 leading-relaxed">
                  This Limited Partnership Agreement ("Agreement") is entered into on [DATE], by and between Summit Capital GP LLC, a Delaware limited liability company ("General Partner"), and the Limited Partners listed on Schedule A attached hereto and incorporated herein by reference ("Limited Partners").
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-3">1. FORMATION OF LIMITED PARTNERSHIP</h3>
                <p className="text-gray-700 leading-relaxed">
                  The parties hereby form a limited partnership (the "Partnership") under the laws of the State of Delaware pursuant to the Delaware Revised Uniform Limited Partnership Act (the "Act").
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-3">2. NAME AND PRINCIPAL PLACE OF BUSINESS</h3>
                <p className="text-gray-700 leading-relaxed">
                  The name of the Partnership shall be "Summit Capital Fund I, L.P." The principal place of business of the Partnership shall be located at [ADDRESS], or such other place as the General Partner may determine.
                </p>
                <h3 className="text-lg font-semibold mt-6 mb-3">3. PURPOSES AND POWERS</h3>
                <p className="text-gray-700 leading-relaxed">
                  The purpose of the Partnership is to engage in investment activities, including but not limited to the acquisition, holding, management, and disposition of securities and other investment assets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Assistant Panel */}
        <div className="w-80 bg-white border-l shadow-lg flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-2">
              <MessageSquare className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold">Document Assistant</h3>
            </div>
            <p className="text-sm text-gray-600 mt-1">{document.name}</p>
          </div>
          
          <div className="flex-1 p-4">
            <div className="space-y-3 mb-4">
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Summarize this document
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Extract key clauses
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Check for compliance issues
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Suggest legal edits
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Compare with template
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-left">
                Flag unusual terms
              </Button>
            </div>
            
            <div className="space-y-2">
              <Input
                placeholder="Ask about this document..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="text-sm"
              />
              <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor;
