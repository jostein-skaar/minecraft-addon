// Generated by https://quicktype.io

export interface TerrainTexture {
  texture_name: string;
  resource_pack_name: string;
  padding: number;
  num_mip_levels: number;
  texture_data: TextureData;
}

export interface TextureData {
  [key: string]: any;
}

export interface Texture {
  textures: string;
}