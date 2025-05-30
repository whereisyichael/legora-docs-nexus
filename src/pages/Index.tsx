import React, { useState } from 'react';
import { Search, File, Tag, Calendar, User, Download, FileText, Grid3X3, List, Folder, Settings, LogOut, ChevronDown, MessageSquare, Filter, X, Plus, Eye, AlertTriangle, Clock, Edit2, Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import DocumentEditor from '@/components/DocumentEditor';
import AddDocumentModal from '@/components/AddDocumentModal';

const sampleDocuments = [
  {
    id: 1,
    name: 'SummitFund_LPA.pdf',
    type: 'Limited Partnership Agreement',
    size: '2.4 MB',
    lastModified: '2024-05-28',
    tags: ['contract', 'partnership', 'investment', 'LPA'],
    ownershipDist: '20% GP / 80% LP',
    decisionMech: 'Majority LP vote',
    profitSharing: '80/20',
    folder: 'Clients/Summit Capital/Fund Formation',
    preview: '/placeholder.svg',
    expiryDate: '2024-12-31',
    isExpiringSoon: true
  },
  {
    id: 2,
    name: 'ApolloFund_LPA.pdf',
    type: 'LLC Operating Agreement',
    size: '1.8 MB',
    lastModified: '2024-05-27',
    tags: ['agreement', 'LLC', 'operating', 'business'],
    ownershipDist: '15% GP / 85% LP',
    decisionMech: 'GP sole discretion',
    profitSharing: '75/20',
    folder: 'Clients/Apollo Ventures/Operating Agreements',
    preview: '/placeholder.svg',
    expiryDate: '2025-01-15',
    isExpiringSoon: false
  },
  {
    id: 3,
    name: 'HorizonPartners.pdf',
    type: 'Partnership Agreement',
    size: '3.1 MB',
    lastModified: '2024-05-26',
    tags: ['partnership', 'agreement', 'equity', 'joint-venture'],
    ownershipDist: 'Equal LP shares',
    decisionMech: 'Unanimous consent',
    profitSharing: 'Equal profit',
    folder: 'Clients/Horizon Investments',
    preview: '/placeholder.svg',
    expiryDate: '2024-11-30',
    isExpiringSoon: true
  },
  {
    id: 4,
    name: 'EquinoxFund_LPA.pdf',
    type: 'Limited Partnership Agreement',
    size: '2.7 MB',
    lastModified: '2024-05-25',
    tags: ['contract', 'LPA', 'fund', 'investment'],
    ownershipDist: 'As per LPA structure',
    decisionMech: 'Majority LP consent',
    profitSharing: 'As per LPA',
    folder: 'Clients/Equinox Capital/Fund Formation',
    preview: '/placeholder.svg',
    expiryDate: '2025-02-28',
    isExpiringSoon: false
  },
  {
    id: 5,
    name: 'VentureGate_LPA.pdf',
    type: 'LLC Agreement',
    size: '2.2 MB',
    lastModified: '2024-05-24',
    tags: ['LLC', 'venture', 'investment', 'agreement'],
    ownershipDist: '10% GP / 90% LP',
    decisionMech: 'GP has veto power',
    profitSharing: '70/30',
    folder: 'Clients/VentureGate/LLC Agreements',
    preview: '/placeholder.svg',
    expiryDate: '2024-10-15',
    isExpiringSoon: true
  },
  {
    id: 6,
    name: 'Employment_Contract_2024.pdf',
    type: 'Employment Agreement',
    size: '1.5 MB',
    lastModified: '2024-05-23',
    tags: ['employment', 'contract', 'HR', 'compensation'],
    ownershipDist: 'N/A',
    decisionMech: 'Employer discretion',
    profitSharing: 'N/A',
    folder: 'Templates/Employment Contracts',
    preview: '/placeholder.svg',
    expiryDate: '2025-03-31',
    isExpiringSoon: false
  },
  {
    id: 7,
    name: 'Patent_Application_AI.pdf',
    type: 'Patent Filing',
    size: '4.2 MB',
    lastModified: '2024-05-22',
    tags: ['patent', 'intellectual-property', 'AI', 'technology'],
    ownershipDist: 'Company owned',
    decisionMech: 'Board approval',
    profitSharing: 'Royalty based',
    folder: 'Templates/Patent Applications',
    preview: '/placeholder.svg',
    expiryDate: '2024-09-30',
    isExpiringSoon: true
  },
  {
    id: 8,
    name: 'NDA_TechPartner.pdf',
    type: 'Non-Disclosure Agreement',
    size: '0.8 MB',
    lastModified: '2024-05-21',
    tags: ['NDA', 'confidentiality', 'partnership', 'technology'],
    ownershipDist: 'Mutual',
    decisionMech: 'Bilateral consent',
    profitSharing: 'N/A',
    folder: 'Templates/NDAs',
    preview: '/placeholder.svg',
    expiryDate: '2025-04-30',
    isExpiringSoon: false
  }
];

const folders = [
  {
    name: 'Clients',
    children: [
      {
        name: 'Summit Capital',
        children: [
          { name: 'Fund Formation', count: 3 },
          { name: 'Side Letters', count: 7 },
          { name: 'LPAs', count: 2 }
        ]
      },
      {
        name: 'Apollo Ventures',
        children: [
          { name: 'Operating Agreements', count: 4 },
          { name: 'Investment Docs', count: 12 }
        ]
      }
    ]
  },
  {
    name: 'Templates',
    children: [
      { name: 'Employment Contracts', count: 5 },
      { name: 'NDAs', count: 8 },
      { name: 'Patent Applications', count: 3 }
    ]
  }
];

const DocumentSidebar = ({ onAddDocument }: { onAddDocument: () => void }) => {
  const renderFolder = (folder: any, level = 0) => (
    <div key={folder.name} className={`${level > 0 ? 'ml-4' : ''}`}>
      <SidebarMenuItem>
        <SidebarMenuButton className="w-full justify-start">
          <Folder className="w-4 h-4" />
          <span className="truncate">{folder.name}</span>
          {folder.count && (
            <Badge variant="secondary" className="ml-auto text-xs">
              {folder.count}
            </Badge>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
      {folder.children?.map((child: any) => renderFolder(child, level + 1))}
    </div>
  );

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-2 py-2">
            <Button 
              onClick={onAddDocument}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Document
            </Button>
          </div>
          <SidebarGroupLabel>Document Folders</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {folders.map(folder => renderFolder(folder))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

const DocumentAssistant = ({ isOpen, onClose, selectedDoc }: { isOpen: boolean; onClose: () => void; selectedDoc?: any }) => {
  const [message, setMessage] = useState('');
  
  if (!isOpen) return null;

  return (
    <div className="w-80 bg-white border-l shadow-lg flex-shrink-0 flex flex-col">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-green-600" />
          <h3 className="font-semibold">Document Assistant</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>
      
      {selectedDoc && (
        <div className="p-4 bg-gray-50 border-b">
          <p className="text-sm font-medium">{selectedDoc.name}</p>
          <p className="text-xs text-gray-600">{selectedDoc.type}</p>
        </div>
      )}
      
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
          <Button variant="outline" size="sm" className="w-full justify-start text-left bg-blue-50 border-blue-200">
            Legal Predictions & Analysis
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
  );
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState(sampleDocuments);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [showAssistant, setShowAssistant] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<any>(null);
  const [showTagFilter, setShowTagFilter] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchMode, setSearchMode] = useState<'fuzzy' | 'boolean' | 'verbatim'>('fuzzy');
  const [editingTag, setEditingTag] = useState<{ docId: number; tagIndex: number; value: string } | null>(null);

  const allTags = Array.from(new Set(sampleDocuments.flatMap(doc => doc.tags)));

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    filterDocuments(query, selectedTags);
  };

  const toggleTag = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newSelectedTags);
    filterDocuments(searchQuery, newSelectedTags);
  };

  const filterDocuments = (query: string, tags: string[]) => {
    let filtered = sampleDocuments;

    if (query) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(query.toLowerCase()) ||
        doc.type.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (tags.length > 0) {
      filtered = filtered.filter(doc =>
        tags.some(tag => doc.tags.includes(tag))
      );
    }

    setFilteredDocuments(filtered);
  };

  const handleDocumentSelect = (doc: any) => {
    setSelectedDocument(doc);
    setShowAssistant(true);
  };

  const handleOpenDocument = (doc: any) => {
    setSelectedDocument(doc);
    setShowEditor(true);
  };

  const handleCloseEditor = () => {
    setShowEditor(false);
    setSelectedDocument(null);
  };

  const handleTagEdit = (docId: number, tagIndex: number, newValue: string) => {
    // Update the tag in the document
    const updatedDocs = sampleDocuments.map(doc => {
      if (doc.id === docId) {
        const newTags = [...doc.tags];
        newTags[tagIndex] = newValue;
        return { ...doc, tags: newTags };
      }
      return doc;
    });
    setFilteredDocuments(updatedDocs);
    setEditingTag(null);
  };

  const handleTagDelete = (docId: number, tagIndex: number) => {
    const updatedDocs = sampleDocuments.map(doc => {
      if (doc.id === docId) {
        const newTags = doc.tags.filter((_, index) => index !== tagIndex);
        return { ...doc, tags: newTags };
      }
      return doc;
    });
    setFilteredDocuments(updatedDocs);
  };

  const handleTagAdd = (docId: number, newTag: string) => {
    const updatedDocs = sampleDocuments.map(doc => {
      if (doc.id === docId) {
        return { ...doc, tags: [...doc.tags, newTag] };
      }
      return doc;
    });
    setFilteredDocuments(updatedDocs);
  };

  if (showEditor && selectedDocument) {
    return <DocumentEditor document={selectedDocument} onClose={handleCloseEditor} />;
  }

  const expiringDocuments = filteredDocuments.filter(doc => doc.isExpiringSoon);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        {/* Full Width Header */}
        <div className="fixed top-0 left-0 right-0 bg-white border-b z-50">
          <div className="px-6 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <SidebarTrigger />
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold text-gray-900">Legora Docs</h1>
                </div>
              </div>

              <div className="flex-1 max-w-2xl mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="What are you looking for?"
                    className="pl-10 h-10 text-base"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <Select value={searchMode} onValueChange={(value: 'fuzzy' | 'boolean' | 'verbatim') => setSearchMode(value)}>
                      <SelectTrigger className="w-24 h-6 text-xs border-0 bg-transparent">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fuzzy">Fuzzy</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="verbatim">Verbatim</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-3 py-2">
                      <p className="font-medium">John Doe</p>
                      <p className="text-sm text-gray-600">Senior Associate</p>
                      <p className="text-xs text-gray-500">Admin Access</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="w-4 h-4 mr-2" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Filter Row */}
            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowTagFilter(!showTagFilter)}
                  className={selectedTags.length > 0 ? 'bg-green-50 border-green-300' : ''}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Tags {selectedTags.length > 0 && `(${selectedTags.length})`}
                </Button>
                
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="bg-green-600 hover:bg-green-700 cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{filteredDocuments.length} documents</span>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="rounded-r-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="rounded-l-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tag Filter Dropdown */}
            {showTagFilter && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg border">
                <div className="flex flex-wrap gap-2">
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={selectedTags.includes(tag) ? "default" : "outline"}
                      className={`cursor-pointer ${
                        selectedTags.includes(tag)
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'hover:bg-green-50 hover:border-green-300'
                      }`}
                      onClick={() => toggleTag(tag)}
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content with top padding for fixed header */}
        <div className="flex flex-1 pt-32">
          <DocumentSidebar onAddDocument={() => setShowAddModal(true)} />
          
          <div className="flex-1 flex flex-col">
            {/* Content Lifecycle Alerts */}
            {expiringDocuments.length > 0 && (
              <div className="p-6 pb-2">
                <Alert className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    {expiringDocuments.length} document(s) expiring soon. Consider archiving or renewal.
                    <Button variant="link" className="p-0 h-auto text-orange-700 underline ml-2">
                      Review lifecycle policies
                    </Button>
                  </AlertDescription>
                </Alert>
              </div>
            )}

            {/* Documents Area */}
            <div className="flex-1 p-6 pt-2 overflow-auto">
              {viewMode === 'list' ? (
                <div className="space-y-2">
                  {filteredDocuments.map((doc, index) => (
                    <Card key={doc.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 flex-1 min-w-0" onClick={() => handleDocumentSelect(doc)}>
                            <div className="flex-shrink-0">
                              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                                <File className="w-4 h-4 text-gray-600" />
                              </div>
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                                {doc.isExpiringSoon && (
                                  <Clock className="w-4 h-4 text-orange-500" />
                                )}
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {doc.tags.map((tag, tagIndex) => (
                                  <div key={tagIndex} className="relative group">
                                    {editingTag?.docId === doc.id && editingTag?.tagIndex === tagIndex ? (
                                      <div className="flex items-center space-x-1">
                                        <Input
                                          value={editingTag.value}
                                          onChange={(e) => setEditingTag({...editingTag, value: e.target.value})}
                                          className="h-6 text-xs w-20"
                                          onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                              handleTagEdit(doc.id, tagIndex, editingTag.value);
                                            }
                                            if (e.key === 'Escape') {
                                              setEditingTag(null);
                                            }
                                          }}
                                          autoFocus
                                        />
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-4 w-4 p-0"
                                          onClick={() => handleTagEdit(doc.id, tagIndex, editingTag.value)}
                                        >
                                          <Check className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Badge 
                                        variant="secondary" 
                                        className="text-xs cursor-pointer hover:bg-gray-200 relative"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setEditingTag({ docId: doc.id, tagIndex, value: tag });
                                        }}
                                      >
                                        {tag}
                                        <Button
                                          size="sm"
                                          variant="ghost"
                                          className="h-3 w-3 p-0 ml-1 opacity-0 group-hover:opacity-100"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleTagDelete(doc.id, tagIndex);
                                          }}
                                        >
                                          <X className="w-2 h-2" />
                                        </Button>
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const newTag = prompt('Enter new tag:');
                                    if (newTag) handleTagAdd(doc.id, newTag);
                                  }}
                                >
                                  <Plus className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleOpenDocument(doc)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                              <Download className="w-4 h-4" />
                            </Button>
                            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                              <div className="text-right">
                                <div className="font-medium text-gray-900">{doc.type}</div>
                                <div className="text-xs">{doc.lastModified}</div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">{doc.size}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredDocuments.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                      <CardContent className="p-3">
                        <div 
                          className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center cursor-pointer relative overflow-hidden"
                          onClick={() => handleDocumentSelect(doc)}
                        >
                          <div className="w-full h-full bg-white border shadow-sm flex flex-col p-2 text-xs">
                            <div className="font-bold text-center mb-2">{doc.type.split(' ')[0]}</div>
                            <div className="space-y-1">
                              <div className="h-1 bg-gray-300 rounded"></div>
                              <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                              <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                              <div className="mt-3 space-y-1">
                                <div className="h-1 bg-gray-200 rounded"></div>
                                <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                                <div className="h-1 bg-gray-200 rounded w-3/5"></div>
                              </div>
                            </div>
                          </div>
                          {doc.isExpiringSoon && (
                            <Clock className="absolute top-2 right-2 w-4 h-4 text-orange-500" />
                          )}
                        </div>
                        <h3 className="font-medium text-sm truncate mb-1">{doc.name}</h3>
                        <p className="text-xs text-gray-600 truncate">{doc.type}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {doc.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleOpenDocument(doc)}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Open
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Document Assistant Panel */}
          {showAssistant && (
            <DocumentAssistant
              isOpen={showAssistant}
              onClose={() => setShowAssistant(false)}
              selectedDoc={selectedDocument}
            />
          )}
        </div>

        <AddDocumentModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
