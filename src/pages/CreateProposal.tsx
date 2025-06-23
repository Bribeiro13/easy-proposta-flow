
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  User, 
  Briefcase, 
  DollarSign, 
  Calendar, 
  FileCheck, 
  MessageSquare,
  Image,
  ArrowLeft,
  ArrowRight,
  Check
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProposalData {
  // Cliente
  clientName: string;
  clientCompany: string;
  clientEmail: string;
  clientPhone: string;
  
  // Serviço
  serviceTitle: string;
  serviceDescription: string;
  
  // Valores
  totalValue: string;
  installments: string;
  paymentMethod: string;
  
  // Prazos
  deliveryDays: string;
  startDate: string;
  
  // Condições
  conditions: string;
  warranty: string;
  
  // Observações
  observations: string;
  
  // Logo
  logo: File | null;
}

const CreateProposal = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;
  
  const [proposalData, setProposalData] = useState<ProposalData>({
    clientName: "",
    clientCompany: "",
    clientEmail: "",
    clientPhone: "",
    serviceTitle: "",
    serviceDescription: "",
    totalValue: "",
    installments: "1",
    paymentMethod: "pix",
    deliveryDays: "",
    startDate: "",
    conditions: "• Aprovação do briefing antes do início dos trabalhos\n• 50% do valor no início, 50% na entrega\n• Prazo de entrega sujeito à aprovação de materiais",
    warranty: "30 dias",
    observations: "",
    logo: null
  });

  const updateData = (field: keyof ProposalData, value: string | File | null) => {
    setProposalData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Simula criação da proposta
    toast({
      title: "Proposta criada com sucesso!",
      description: "Sua proposta está pronta para ser enviada."
    });
    navigate("/dashboard");
  };

  const getStepIcon = (step: number) => {
    const icons = [
      User, Briefcase, DollarSign, Calendar, FileCheck, MessageSquare, Image
    ];
    const Icon = icons[step - 1];
    return <Icon className="w-5 h-5" />;
  };

  const steps = [
    "Cliente", "Serviço", "Valores", "Prazos", "Condições", "Observações", "Finalizar"
  ];

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5 text-gray-500" />
              <span className="text-gray-700">Voltar ao Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Nova Proposta</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Passo {currentStep} de {totalSteps}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / totalSteps) * 100)}% concluído
            </span>
          </div>
          <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          
          {/* Step indicators */}
          <div className="flex justify-between mt-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index + 1 <= currentStep ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  {index + 1 < currentStep ? <Check className="w-5 h-5" /> : getStepIcon(index + 1)}
                </div>
                <span className="text-xs mt-1 text-gray-600 hidden sm:block">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getStepIcon(currentStep)}
              <span>{steps[currentStep - 1]}</span>
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Informações do cliente que receberá a proposta"}
              {currentStep === 2 && "Descreva o serviço que será prestado"}
              {currentStep === 3 && "Defina os valores e formas de pagamento"}
              {currentStep === 4 && "Estabeleça os prazos de execução"}
              {currentStep === 5 && "Condições gerais e políticas"}
              {currentStep === 6 && "Observações finais e upload do logo"}
              {currentStep === 7 && "Revise e finalize sua proposta"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Cliente */}
            {currentStep === 1 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Nome do cliente *</Label>
                    <Input
                      id="clientName"
                      placeholder="João Silva"
                      value={proposalData.clientName}
                      onChange={(e) => updateData('clientName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientCompany">Empresa (opcional)</Label>
                    <Input
                      id="clientCompany"
                      placeholder="Empresa ABC Ltda"
                      value={proposalData.clientCompany}
                      onChange={(e) => updateData('clientCompany', e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clientEmail">E-mail *</Label>
                    <Input
                      id="clientEmail"
                      type="email"
                      placeholder="joao@empresa.com"
                      value={proposalData.clientEmail}
                      onChange={(e) => updateData('clientEmail', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientPhone">Telefone/WhatsApp *</Label>
                    <Input
                      id="clientPhone"
                      placeholder="(11) 99999-9999"
                      value={proposalData.clientPhone}
                      onChange={(e) => updateData('clientPhone', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Serviço */}
            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="serviceTitle">Título do serviço *</Label>
                  <Input
                    id="serviceTitle"
                    placeholder="Ex: Criação de Website Institucional"
                    value={proposalData.serviceTitle}
                    onChange={(e) => updateData('serviceTitle', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Descrição detalhada *</Label>
                  <Textarea
                    id="serviceDescription"
                    placeholder="Descreva em detalhes o que será entregue, incluindo funcionalidades, escopo, materiais, etc."
                    value={proposalData.serviceDescription}
                    onChange={(e) => updateData('serviceDescription', e.target.value)}
                    rows={6}
                    required
                  />
                </div>
              </>
            )}

            {/* Step 3: Valores */}
            {currentStep === 3 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalValue">Valor total *</Label>
                    <Input
                      id="totalValue"
                      placeholder="2500.00"
                      value={proposalData.totalValue}
                      onChange={(e) => updateData('totalValue', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="installments">Parcelas</Label>
                    <Select value={proposalData.installments} onValueChange={(value) => updateData('installments', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">À vista</SelectItem>
                        <SelectItem value="2">2x</SelectItem>
                        <SelectItem value="3">3x</SelectItem>
                        <SelectItem value="4">4x</SelectItem>
                        <SelectItem value="6">6x</SelectItem>
                        <SelectItem value="12">12x</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Forma de pagamento preferencial</Label>
                  <Select value={proposalData.paymentMethod} onValueChange={(value) => updateData('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pix">PIX</SelectItem>
                      <SelectItem value="boleto">Boleto</SelectItem>
                      <SelectItem value="transferencia">Transferência</SelectItem>
                      <SelectItem value="cartao">Cartão de crédito</SelectItem>
                      <SelectItem value="dinheiro">Dinheiro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 4: Prazos */}
            {currentStep === 4 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryDays">Prazo de entrega (dias) *</Label>
                    <Input
                      id="deliveryDays"
                      placeholder="15"
                      value={proposalData.deliveryDays}
                      onChange={(e) => updateData('deliveryDays', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Data prevista de início</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={proposalData.startDate}
                      onChange={(e) => updateData('startDate', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* Step 5: Condições */}
            {currentStep === 5 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="conditions">Condições gerais</Label>
                  <Textarea
                    id="conditions"
                    value={proposalData.conditions}
                    onChange={(e) => updateData('conditions', e.target.value)}
                    rows={6}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="warranty">Garantia</Label>
                  <Input
                    id="warranty"
                    placeholder="30 dias"
                    value={proposalData.warranty}
                    onChange={(e) => updateData('warranty', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Step 6: Observações */}
            {currentStep === 6 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="observations">Observações finais</Label>
                  <Textarea
                    id="observations"
                    placeholder="Informações adicionais, agradecimentos, etc."
                    value={proposalData.observations}
                    onChange={(e) => updateData('observations', e.target.value)}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="logo">Logo da sua empresa (opcional)</Label>
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={(e) => updateData('logo', e.target.files?.[0] || null)}
                  />
                  <p className="text-xs text-gray-500">
                    Formatos aceitos: JPG, PNG, SVG (máx. 2MB)
                  </p>
                </div>
              </>
            )}

            {/* Step 7: Revisão */}
            {currentStep === 7 && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Check className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-800">Proposta pronta!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Revise os dados abaixo e finalize sua proposta.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Cliente</h4>
                    <p>{proposalData.clientName}</p>
                    {proposalData.clientCompany && <p>{proposalData.clientCompany}</p>}
                    <p>{proposalData.clientEmail}</p>
                    <p>{proposalData.clientPhone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Serviço</h4>
                    <p className="font-medium">{proposalData.serviceTitle}</p>
                    <p className="text-gray-600 text-xs mt-1">
                      {proposalData.serviceDescription.substring(0, 100)}...
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Valores</h4>
                    <p>R$ {proposalData.totalValue}</p>
                    <p>{proposalData.installments}x • {proposalData.paymentMethod.toUpperCase()}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Prazos</h4>
                    <p>{proposalData.deliveryDays} dias para entrega</p>
                    {proposalData.startDate && (
                      <p>Início: {new Date(proposalData.startDate).toLocaleDateString('pt-BR')}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Anterior
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Próximo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  <Check className="w-4 h-4 mr-2" />
                  Finalizar Proposta
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CreateProposal;
