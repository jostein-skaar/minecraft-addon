import { Block, Blocks } from './types/blocks';
import { CustomBlock } from './types/custom-block';
import { Manifest } from './types/manifest';
import { TerrainTexture, Texture } from './types/terrain-texture';

const min_engine_version = [1, 17, 20];
const format_version = min_engine_version.join('.');

export function createManifest(
  version: number[],
  name: string,
  description: string,
  uuid_header: string,
  uuid_module: string,
  uuid_dependency: string,
  module_type: string,
  authors: string[]
): Manifest {
  const manifest: Manifest = {
    format_version: 2,
    header: {
      name,
      description,
      uuid: uuid_header,
      version,
      min_engine_version,
    },
    modules: [
      {
        description,
        type: module_type,
        uuid: uuid_module,
        version,
      },
    ],
    dependencies: [
      {
        uuid: uuid_dependency,
        version,
      },
    ],
    metadata: {
      authors,
      license: 'MIT',
    },
  };
  return manifest;
}

export function createCustomBlock(name: string, lightAbsorption = 0.5, lightEmmission = 1): CustomBlock {
  const customBlock: CustomBlock = {
    format_version,
    'minecraft:block': {
      description: {
        identifier: name,
        is_experimental: false,
        register_to_creative_menu: true,
      },
      components: {
        'minecraft:creative_category': {
          category: 'construction',
        },
        'minecraft:destroy_time': 3,
        'minecraft:explosion_resistance': 5,
        'minecraft:friction': 0.6,
        'minecraft:flammable': {
          flame_odds: 0,
          burn_odds: 0,
        },
        'minecraft:map_color': '#FFFFFF',
        'minecraft:block_light_absorption': lightAbsorption,
        'minecraft:block_light_emission': lightEmmission,
      },
    },
  };
  return customBlock;
}

export function createBlock(name: string, textures: string, sound = 'dirt'): Blocks {
  const blocks: Blocks = {
    format_version,
  };
  const block: Block = {
    textures,
    sound,
  };
  blocks[name] = block;
  return blocks;
}

export function createTerrainTexture(name: string, resource_pack_name: string) {
  const terrainTexture: TerrainTexture = {
    texture_name: 'atlas.terrain',
    resource_pack_name,
    padding: 8,
    num_mip_levels: 4,
    texture_data: {},
  };
  const texture: Texture = {
    textures: `textures/blocks/${name}`,
  };
  terrainTexture.texture_data[name] = texture;
  return terrainTexture;
}
