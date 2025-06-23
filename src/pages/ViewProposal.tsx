
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  FileText, 
  Download, 
  MessageCircle, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Clock,
  User,
  Briefcase
} from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const ViewProposal = () => {
  const { id } = useParams();
  const [isAccepted, setIsAccepted] = useState(false);
  
  // Dados mockados da proposta
  const proposal = {
    id: id,
    title: "Website Institucional - Empresa ABC",
    client: {
      name: "João Silva",
      company: "Empresa ABC Ltda",
      email: "joao@empresa.com",
      phone: "(11) 99999-9999"
    },
    provider: {
      name: "Maria Designer",
      email: "maria@designer.com",
      phone: "(11) 88888-8888",
      logo: null
    },
    service: {
      title: "Criação de Website Institucional Responsivo",
      description: `Desenvolvimento completo de website institucional responsivo com as seguintes características:

• Design moderno e profissional
• Layout responsivo (mobile, tablet, desktop)
• 5 páginas principais (Home, Sobre, Serviços, Portfolio, Contato)
• Integração com formulário de contato
• Otimização para SEO básico
• Painel administrativo para edição de conteúdo
• Hospedagem por 12 meses incluída
• SSL/certificado de segurança
• Treinamento para uso do painel

O site será desenvolvido utilizando as melhores práticas de desenvolvimento web, garantindo velocidade de carregamento e uma experiência de usuário excepcional.`
    },
    pricing: {
      totalValue: 2500,
      installments: 2,
      paymentMethod: "PIX",
      installmentValue: 1250
    },
    timeline: {
      deliveryDays: 15,
      startDate: "2024-02-01"
    },
    conditions: `• Aprovação do briefing antes do início dos trabalhos
• 50% do valor no início, 50% na entrega
• Prazo de entrega sujeito à aprovação de materiais
• Revisões: até 3 rodadas de ajustes incluídas
• Conteúdo (textos e imagens) por conta do cliente
• Garantia de 30 dias para correções`,
    warranty: "30 dias",
    observations: "Agradecemos a oportunidade de apresentar esta proposta. Estamos à disposição para esclarecimentos e ansiosos para dar vida ao seu projeto!",
    createdAt: "2024-01-15",
    validUntil: "2024-02-15"
  };

  const handleWhatsAppAccept = () => {
    const message = `Olá! Gostaria de *ACEITAR* a proposta "${proposal.title}" no valor de R$ ${proposal.pricing.totalValue.toLocaleString()}. Podemos prosseguir?`;
    const phone = proposal.provider.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsAccepted(true);
  };

  const handleWhatsAppReject = () => {
    const message = `Olá! Analisei a proposta "${proposal.title}" mas infelizmente não poderemos prosseguir neste momento. Obrigado pela atenção!`;
    const phone = proposal.provider.phone.replace(/\D/g, '');
    const whatsappUrl = `https://wa.me/55${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleDownloadPDF = () => {
    // Simula download do PDF
    alert('Download do PDF iniciado!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Proposta Comercial</h1>
                <p className="text-gray-600">#{proposal.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Clock className="w-3 h-3 mr-1" />
                Válida até {new Date(proposal.validUntil).toLocaleDateString('pt-BR')}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Alert */}
        {isAccepted && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Proposta aceita!</span>
            </div>
            <p className="text-green-700 text-sm mt-1">
              Obrigado por aceitar nossa proposta. Entraremos em contato em breve!
            </p>
          </div>
        )}

        {/* Main Content */}
        <div className="grid gap-8">
          {/* Client & Provider Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <User className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Cliente</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{proposal.client.name}</p>
                  {proposal.client.company && (
                    <p className="text-gray-600">{proposal.client.company}</p>
                  )}
                  <p className="text-gray-600">{proposal.client.email}</p>
                  <p className="text-gray-600">{proposal.client.phone}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Prestador</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{proposal.provider.name}</p>
                  <p className="text-gray-600">{proposal.provider.email}</p>
                  <p className="text-gray-600">{proposal.provider.phone}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Service Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{proposal.service.title}</h3>
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {proposal.service.description}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Timeline */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Investimento</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      R$ {proposal.pricing.totalValue.toLocaleString()}
                    </p>
                    <p className="text-gray-600 text-sm">Valor total</p>
                  </div>
                  <Separator />
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="font-medium">Parcelas:</span>{" "}
                      {proposal.pricing.installments}x de R$ {proposal.pricing.installmentValue.toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Forma de pagamento:</span>{" "}
                      {proposal.pricing.paymentMethod}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Calendar className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-gray-900">Cronograma</h3>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-gray-900">Prazo de entrega</p>
                    <p className="text-gray-600">{proposal.timeline.deliveryDays} dias úteis</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Início previsto</p>
                    <p className="text-gray-600">
                      {new Date(proposal.timeline.startDate).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Garantia</p>
                    <p className="text-gray-600">{proposal.warranty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conditions */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Condições Gerais</h3>
              <div className="whitespace-pre-line text-gray-700 text-sm leading-relaxed">
                {proposal.conditions}
              </div>
            </CardContent>
          </Card>

          {/* Observations */}
          {proposal.observations && (
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Observações</h3>
                <div className="text-gray-700 text-sm leading-relaxed">
                  {proposal.observations}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">
                Gostou da proposta?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleWhatsAppAccept}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Aceitar via WhatsApp
                </Button>
                <Button 
                  onClick={handleDownloadPDF}
                  variant="outline"
                  size="lg"
                  className="flex-1"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Baixar PDF
                </Button>
                <Button 
                  onClick={handleWhatsAppReject}
                  variant="outline"
                  size="lg"
                  className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Não tenho interesse
                </Button>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Proposta válida até {new Date(proposal.validUntil).toLocaleDateString('pt-BR')} • 
                  Criada em {new Date(proposal.createdAt).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pb-8">
          <div className="flex items-center justify-center space-x-2 text-gray-400">
            <div className="w-6 h-6 bg-gray-300 rounded flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-sm">Criado com Proposta Rápida</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProposal;
