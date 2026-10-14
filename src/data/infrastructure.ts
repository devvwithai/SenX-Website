/**
 * SenX Cloud Centralized Infrastructure & Hardware Specification Configuration
 * 
 * STRICT BUSINESS SCOPE: Game Server Hosting Only
 * VERIFIED REGIONS: India & Bangladesh
 * VERIFIED CPUS: AMD Ryzen 7 5700G & Intel Xeon E5-2697 v4
 */

export interface HostingLocation {
  id: string;
  name: string;
  country: string;
  countryCode: 'BD' | 'IN';
  flag: string;
  city: string;
  shortCode: string;
  lat: number;
  lng: number;
  network: string;
  peering: string;
  status: 'Online' | 'Maintenance';
  supportedCpus: string[];
}

export interface HardwareCpu {
  id: string;
  model: string;
  manufacturer: 'AMD' | 'Intel';
  architecture: string;
  description: string;
  idealFor: string;
  locations: string[];
}

export interface InfrastructureConfig {
  companyName: string;
  businessScope: string;
  locations: HostingLocation[];
  supportedCpus: HardwareCpu[];
  storageType: string;
  ddosMitigation: {
    type: string;
    description: string;
  };
  controlPanel: {
    name: string;
    description: string;
    features: string[];
  };
}

export const INFRASTRUCTURE_CONFIG: InfrastructureConfig = {
  companyName: 'SenX Cloud',
  businessScope: 'Game Server Hosting',
  locations: [
    {
      id: 'bangladesh',
      name: 'Bangladesh (Dhaka BDIX Edge)',
      country: 'Bangladesh',
      countryCode: 'BD',
      flag: 'BD',
      city: 'Dhaka',
      shortCode: 'BD-DHK',
      lat: 23.8103,
      lng: 90.4125,
      network: 'BDIX Peered Network',
      peering: 'Direct BDIX Local Peering for ultra-low latency across all Bangladeshi ISPs',
      status: 'Online',
      supportedCpus: ['AMD Ryzen 7 5700G', 'Intel Xeon E5-2697 v4'],
    },
    {
      id: 'india',
      name: 'India (Mumbai Central Facility)',
      country: 'India',
      countryCode: 'IN',
      flag: 'IN',
      city: 'Mumbai',
      shortCode: 'IN-BOM',
      lat: 19.0760,
      lng: 72.8777,
      network: 'Tier-3 Datacenter Interconnect',
      peering: 'National NIXI Peering & Direct ISP Transit across South Asia',
      status: 'Online',
      supportedCpus: ['Intel Xeon Platinum 8269CY'],
    },
  ],
  supportedCpus: [
    {
      id: 'ryzen-5700g',
      model: 'AMD Ryzen 7 5700G',
      manufacturer: 'AMD',
      architecture: 'Zen 3 (8 Cores / 16 Threads, up to 4.6 GHz)',
      description: 'High clock speeds optimized for single-thread game loop processing (Minecraft Paper/Purpur, Palworld, Rust).',
      idealFor: 'Single-thread heavy tick processing and high TPS gaming servers',
      locations: ['Bangladesh — BDIX'],
    },
    {
      id: 'xeon-e5-2697v4',
      model: 'Intel Xeon E5-2697 v4',
      manufacturer: 'Intel',
      architecture: 'Broadwell-EP (18 Cores / 36 Threads, 45MB Cache)',
      description: 'Enterprise multi-core compute engine built for multi-instance game server clusters, proxies, and community networks.',
      idealFor: 'Bungee/Velocity networks, large player communities, and multi-world modpacks',
      locations: ['Bangladesh — BDIX'],
    },
    {
      id: 'xeon-platinum-8269cy',
      model: 'Intel Xeon Platinum 8269CY',
      manufacturer: 'Intel',
      architecture: 'Cascade Lake (26 Cores / 52 Threads, up to 3.8 GHz Turbo)',
      description: 'Enterprise-grade Xeon Platinum compute hardware engineered for low-latency game hosting throughout India.',
      idealFor: 'Indian game server deployments, high-concurrency player lobbies, and modpacks',
      locations: ['India'],
    },
  ],
  storageType: 'Enterprise NVMe SSD RAID Arrays',
  ddosMitigation: {
    type: 'Inline Enterprise Anti-DDoS Filter',
    description: 'Hardware and protocol-specific L3/L4/L7 scrubbing optimized for Minecraft, FiveM, Rust, and UDP game payloads.',
  },
  controlPanel: {
    name: 'SenX Custom Pterodactyl Panel',
    description: 'Intuitive web dashboard with sub-second websocket console, SFTP file access, and daily cloud backup slots.',
    features: [
      'Live Web Terminal & Console',
      'One-Click Modpack & Plugin Installers',
      'Daily Cloud Backup',
      'Custom Sub-Domain Manager',
      'Full SFTP File Access',
    ],
  },
};
