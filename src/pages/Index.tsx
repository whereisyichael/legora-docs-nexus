
import React, { useState } from 'react';
import { Search, File, Tag, Calendar, User, Download, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    profitSharing: '80/20'
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
    profitSharing: '75/20'
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
    profitSharing: 'Equal profit'
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
    profitSharing: 'As per LPA'
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
    profitSharing: '70/30'
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
    profitSharing: 'N/A'
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
    profitSharing: 'Royalty based'
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
    profitSharing: 'N/A'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredDocuments, setFilteredDocuments] = useState(sampleDocuments);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Legora Docs</h1>
            </div>
            <div className="text-sm text-gray-600">
              {filteredDocuments.length} documents
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Conversational Search */}
        <div className="mb-8">
          <Card className="bg-white/90 backdrop-blur-sm shadow-lg border-0 rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Compare these partnership agreements and side-letters..."
                    className="pl-12 pr-4 py-4 text-lg border-0 bg-gray-50/50 rounded-xl focus:ring-2 focus:ring-green-500/20"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </div>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-4 rounded-xl">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="mt-4 flex items-center space-x-2 text-sm text-gray-600">
                <File className="w-4 h-4" />
                <span>Search through {sampleDocuments.length} documents</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tag Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className={`cursor-pointer transition-all ${
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

        {/* Documents Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredDocuments.map((doc, index) => (
            <Card key={doc.id} className="bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-200 border-0 rounded-xl overflow-hidden group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                        <File className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-gray-500 text-sm font-medium">{index + 1}</span>
                        <h3 className="font-medium text-gray-900 truncate">{doc.name}</h3>
                        <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {doc.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:flex items-center space-x-8 text-sm text-gray-600">
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 mb-1">Structure</div>
                      <div className="truncate">{doc.type}</div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 mb-1">Ownership dist.</div>
                      <div className="truncate">{doc.ownershipDist}</div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 mb-1">Decision Mech...</div>
                      <div className="truncate">{doc.decisionMech}</div>
                    </div>
                    
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 mb-1">Profit Sharing</div>
                      <div className="truncate">{doc.profitSharing}</div>
                    </div>
                  </div>
                </div>

                {/* Mobile view for additional info */}
                <div className="md:hidden mt-4 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Structure</div>
                    <div className="text-gray-600">{doc.type}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 mb-1">Last Modified</div>
                    <div className="text-gray-600">{doc.lastModified}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <File className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
