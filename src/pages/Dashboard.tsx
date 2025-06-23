
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Plus, 
  Eye, 
  Edit, 
  Copy, 
  Crown, 
  BarChart3,
  Calendar,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  // Dados mockados das propostas
  const [proposals] = useState([
    {
      id: 1,
      title: "Website Institucional - Empresa ABC",
      client: "João Silva",
      value: 2500,
      status: "pending",
      createdAt: "2024-01-15",
      viewCount: 3
    },
    {
      id: 2,
      title: "Logotipo e Identidade Visual",
      client: "Maria Santos",
      value: 800,
      status: "approved",
      createdAt: "2024-01-10",
      viewCount: 5
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprovada';
      case 'rejected':
        return 'Rejeitada';
      default:
        return 'Pendente';
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'approved':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">Proposta Rápida</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {user.plan === 'free' && <Crown className="w-4 h-4 text-accent" />}
                <span className="text-sm text-gray-600">
                  {user.name} • {user.plan === 'free' ? 'Plano Gratuito' : 'Premium'}
                </span>
              </div>
              <Button variant="outline" onClick={logout}>
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Olá, {user.name}! 👋
          </h1>
          <p className="text-gray-600">
            Gerencie suas propostas e acompanhe o crescimento do seu negócio.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Propostas Criadas</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{proposals.length}</div>
              <p className="text-xs text-muted-foreground">
                {user.plan === 'free' ? `${3 - proposals.length} restantes este mês` : 'Ilimitadas'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Taxa de Aprovação</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">50%</div>
              <p className="text-xs text-muted-foreground">
                1 de 2 propostas aprovadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">R$ 3.300</div>
              <p className="text-xs text-muted-foreground">
                Em propostas criadas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Seu Plano</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.plan === 'free' ? 'Gratuito' : 'Premium'}</div>
              {user.plan === 'free' && (
                <Button variant="link" className="text-xs p-0 h-auto text-accent">
                  Fazer upgrade →
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Action Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/create-proposal" className="flex-1">
              <Button size="lg" className="w-full">
                <Plus className="w-5 h-5 mr-2" />
                Nova Proposta
              </Button>
            </Link>
            {user.plan === 'free' && (
              <Button variant="outline" size="lg" className="text-accent border-accent">
                <Crown className="w-5 h-5 mr-2" />
                Upgrade para Premium
              </Button>
            )}
          </div>
        </div>

        {/* Proposals List */}
        <Card>
          <CardHeader>
            <CardTitle>Suas Propostas</CardTitle>
            <CardDescription>
              Gerencie e acompanhe o status de todas suas propostas
            </CardDescription>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhuma proposta criada ainda
                </h3>
                <p className="text-gray-600 mb-6">
                  Crie sua primeira proposta e comece a impressionar seus clientes!
                </p>
                <Link to="/create-proposal">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeira Proposta
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.map((proposal) => (
                  <div key={proposal.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="font-medium text-gray-900">{proposal.title}</h3>
                          <Badge variant={getStatusVariant(proposal.status)}>
                            {getStatusIcon(proposal.status)}
                            <span className="ml-1">{getStatusText(proposal.status)}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          Cliente: {proposal.client} • Valor: R$ {proposal.value.toLocaleString()} • 
                          Criada em {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {proposal.viewCount} visualizações
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Ver
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-1" />
                          Editar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Copy className="w-4 h-4 mr-1" />
                          Duplicar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
