import { leadEnrichmentAgent } from './leadEnrichmentAgent';
import { aiSdrAgent } from './aiSdrAgent';
import { proposalGeneratorAgent } from './proposalGeneratorAgent';
import { personalizedEmailAgent } from './personalizedEmailAgent';
import { leadScoringAgent } from './leadScoringAgent';
import { aiAeAgent } from './aiAeAgent';
import { objectionHandlerAgent } from './objectionHandlerAgent';
import { coldOutreachCloserAgent } from './coldOutreachCloserAgent';
import { smartDemoBotAgent } from './smartDemoBotAgent';
import { followUpAgent } from './followUpAgent';
import { voiceAgent } from './voiceAgent';
import { smsCampaignerAgent } from './smsCampaignerAgent';
import { meetingsAgent } from './meetingsAgent';
import { aiDialerAgent } from './aiDialerAgent';
import { aiJourneysAgent } from './aiJourneysAgent';
import { whatsappNurturerAgent } from './whatsappNurturerAgent';
import { reengagementAgent } from './reengagementAgent';

export async function runAgentWorkflow(agentId: string, input: any, setSteps?: (steps: unknown) => void) {
  switch (agentId) {
    // Contact Module Agents
    case "lead-enrichment":
      return await leadEnrichmentAgent(input, setSteps);
    case "ai-sdr":
      return await aiSdrAgent(input, setSteps);
    case "personalized-email":
      return await personalizedEmailAgent(input, setSteps);
    case "lead-scoring":
      return await leadScoringAgent(input, setSteps);
      
    // Deal Module Agents
    case "proposal-generator":
      return await proposalGeneratorAgent(input, setSteps);
    case "ai-ae":
      return await aiAeAgent(input, setSteps);
    case "objection-handler":
      return await objectionHandlerAgent(input, setSteps);
    case "cold-outreach-closer":
      return await coldOutreachCloserAgent(input, setSteps);
    case "smart-demo-bot":
      return await smartDemoBotAgent(input, setSteps);
      
    // Task Module Agents
    case "follow-up":
      return await followUpAgent(input, setSteps);
    case "voice-agent":
      return await voiceAgent(input, setSteps);
    case "sms-campaigner":
      return await smsCampaignerAgent(input, setSteps);
      
    // Calendar Module Agents
    case "meetings-agent":
      return await meetingsAgent(input, setSteps);
    case "ai-dialer":
      return await aiDialerAgent(input, setSteps);
    case "ai-journeys":
      return await aiJourneysAgent(input, setSteps);
      
    // Campaign Module Agents
    case "whatsapp-nurturer":
      return await whatsappNurturerAgent(input, setSteps);
    case "reengagement-agent":
      return await reengagementAgent(input, setSteps);
      
    default:
      throw new Error(`Unknown agent: ${agentId}`);
  }
}

// Lightweight orchestrator metadata and selector used by GoalExecution modals
export type AgentType =
  | 'aiAeAgent'
  | 'lead-enrichment'
  | 'ai-sdr'
  | 'personalized-email'
  | 'lead-scoring'
  | 'proposal-generator'
  | 'objection-handler'
  | 'cold-outreach-closer'
  | 'smart-demo-bot'
  | 'follow-up'
  | 'voice-agent'
  | 'sms-campaigner'
  | 'meetings-agent'
  | 'ai-dialer'
  | 'ai-journeys'
  | 'whatsapp-nurturer'
  | 'reengagement-agent';

export const AVAILABLE_AGENTS: Record<AgentType, { name: string; capabilities: string[] }> = {
  'aiAeAgent': { name: 'AI AE Agent', capabilities: ['Sales Assistance', 'Coordination'] },
  'lead-enrichment': { name: 'Lead Enrichment', capabilities: ['Data Enrichment', 'Research'] },
  'ai-sdr': { name: 'AI SDR', capabilities: ['Prospecting', 'Outreach'] },
  'personalized-email': { name: 'Email Personalizer', capabilities: ['Email Generation'] },
  'lead-scoring': { name: 'Lead Scorer', capabilities: ['Scoring', 'Prioritization'] },
  'proposal-generator': { name: 'Proposal Generator', capabilities: ['Document Generation'] },
  'objection-handler': { name: 'Objection Handler', capabilities: ['Response Crafting'] },
  'cold-outreach-closer': { name: 'Cold Outreach Closer', capabilities: ['Messaging', 'Follow-ups'] },
  'smart-demo-bot': { name: 'Smart Demo Bot', capabilities: ['Demo Scripts', 'Guidance'] },
  'follow-up': { name: 'Follow-up Agent', capabilities: ['Reminders', 'Sequencing'] },
  'voice-agent': { name: 'Voice Agent', capabilities: ['Calls', 'Voicemail'] },
  'sms-campaigner': { name: 'SMS Campaigner', capabilities: ['SMS', 'Drips'] },
  'meetings-agent': { name: 'Meetings Agent', capabilities: ['Scheduling', 'Agenda'] },
  'ai-dialer': { name: 'AI Dialer', capabilities: ['Auto Dial', 'Call Assist'] },
  'ai-journeys': { name: 'AI Journeys', capabilities: ['Workflows', 'Automation'] },
  'whatsapp-nurturer': { name: 'WhatsApp Nurturer', capabilities: ['WhatsApp', 'Nurture'] },
  'reengagement-agent': { name: 'Re-engagement Agent', capabilities: ['Reactivation'] },
};

export function getAgentForGoal(title: string, description?: string, toolsNeeded: string[] = []): AgentType | null {
  const text = `${title} ${description || ''}`.toLowerCase();
  if (toolsNeeded.map(t => t.toLowerCase()).some(t => t.includes('email'))) return 'personalized-email';
  if (text.includes('proposal')) return 'proposal-generator';
  if (text.includes('demo')) return 'smart-demo-bot';
  if (text.includes('meeting') || text.includes('schedule')) return 'meetings-agent';
  if (text.includes('lead') && text.includes('score')) return 'lead-scoring';
  if (text.includes('enrich') || text.includes('research')) return 'lead-enrichment';
  if (text.includes('sdr') || text.includes('outreach')) return 'ai-sdr';
  return 'aiAeAgent';
}