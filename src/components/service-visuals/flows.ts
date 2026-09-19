/**
 * "Nasil calisir" akis diyagramlarinin yapisi. Her hizmet: soldan saga asamalar, her asamada 1-3 dugum.
 * Dugum kimlikleri `messages → serviceVisuals.<slug>.flow.nodes.<id>` etiketleriyle eslesir (3 dil).
 * `core` vurgulu dugum — hizmetin merkezindeki is. Rakam veya olcum icermez; kavramsal akistir.
 */
export interface ServiceFlowDef {
  stages: string[][];
  core: string;
}

export const SERVICE_FLOWS: Record<string, ServiceFlowDef> = {
  'web-design': {
    stages: [['strategy'],['architecture'],['designSystem'],['build','cms'],['launch']],
    core: 'designSystem',
  },
  'custom-software': {
    stages: [['process'],['dataModel','roles'],['api','integrations'],['panel','documents'],['handover']],
    core: 'dataModel',
  },
  'web-app': {
    stages: [['client','realtime'],['auth'],['appLayer'],['database','integrations'],['monitoring']],
    core: 'appLayer',
  },
  'mobile-app': {
    stages: [['decision'],['design'],['codebase','backend'],['ios','android'],['stores']],
    core: 'codebase',
  },
  'progressive-web-app': {
    stages: [['shell'],['serviceWorker'],['cache','sync','push'],['homeScreen','updates']],
    core: 'serviceWorker',
  },
  'ecommerce': {
    stages: [['storefront'],['cart'],['payment'],['shipping','marketplace'],['backOffice']],
    core: 'backOffice',
  },
  'erp-crm': {
    stages: [['quote'],['order'],['stock','production'],['invoice'],['account','dealer']],
    core: 'order',
  },
  'automation': {
    stages: [['trigger'],['rules','ai'],['actions','notify'],['monitoring']],
    core: 'rules',
  },
  'whatsapp-chatbot': {
    stages: [['customer','visitor'],['whatsapp','siteChat'],['bot'],['handoff','crm']],
    core: 'bot',
  },
  'ai-integration': {
    stages: [['sources'],['rag'],['model','tools'],['guardrails'],['app','observability']],
    core: 'model',
  },
  'ai-consulting': {
    stages: [['discovery'],['readiness'],['useCases','vendors'],['prioritize'],['roadmap']],
    core: 'prioritize',
  },
  'data-engineering': {
    stages: [['sources'],['extract','orchestration'],['warehouse','dbt'],['metrics'],['dashboards']],
    core: 'warehouse',
  },
  'cloud-ecosystem': {
    stages: [['code'],['cicd','iac'],['cloud','vercel'],['monitoring','runbooks']],
    core: 'cloud',
  },
  'google-ads': {
    stages: [['search'],['searchAds','pmax'],['landing'],['tracking'],['optimize']],
    core: 'tracking',
  },
  'meta-ads': {
    stages: [['audience','retargeting'],['creative'],['feed'],['pixel'],['iterate']],
    core: 'pixel',
  },
  'seo-geo': {
    stages: [['audit'],['crawl','vitals'],['schema','content'],['ranking','citation']],
    core: 'schema',
  },
  'maintenance-support': {
    stages: [['monitoring'],['patches','deps'],['backup'],['requests'],['report']],
    core: 'monitoring',
  },
  'how-to-do': {
    stages: [['needs'],['curriculum'],['workshop','mentoring'],['playbook'],['independent']],
    core: 'workshop',
  },
};
