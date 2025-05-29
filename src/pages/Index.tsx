import React, { useState } from 'react';
import { Search, File, Tag, Calendar, User, Download, FileText, Grid3X3, List, Folder, Settings, LogOut, ChevronDown, MessageSquare, Filter, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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
    preview: '/placeholder.svg'
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

const DocumentSidebar = () => {
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
    <div className="fixed right-0 top-0 h-full w-80 bg-white border-l shadow-lg z-50">
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <DocumentSidebar />
        
        <main className="flex-1">
          {/* Header */}
          <div className="bg-white border-b sticky top-0 z-40">
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

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      className="pl-10 w-64 h-8"
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                    />
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="flex items-center space-x-2">
                        <Avatar className="w-6 h-6">
                          <AvatarImage src="/placeholder.svg" />
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

          {/* Documents Area */}
          <div className="p-6">
            {viewMode === 'list' ? (
              <div className="space-y-2">
                {filteredDocuments.map((doc, index) => (
                  <Card key={doc.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={() => handleDocumentSelect(doc)}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                              <File className="w-4 h-4 text-gray-600" />
                            </div>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                              <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                <Download className="w-4 h-4" />
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-2">
                              {doc.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {doc.tags.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{doc.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

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
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredDocuments.map((doc) => (
                  <Card key={doc.id} className="hover:shadow-md transition-all duration-200 cursor-pointer group" onClick={() => handleDocumentSelect(doc)}>
                    <CardContent className="p-3">
                      <div className="aspect-[3/4] bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                        <img src={doc.preview} alt={doc.name} className="w-full h-full object-cover rounded-lg" />
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
        </main>

        <DocumentAssistant
          isOpen={showAssistant}
          onClose={() => setShowAssistant(false)}
          selectedDoc={selectedDocument}
        />
      </div>
    </SidebarProvider>
  );
};

export default Index;
