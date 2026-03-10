// Stub type declarations for purely frontend project.
import type { Identity } from "@icp-sdk/core/agent";

export interface backendInterface {}

export interface CreateActorOptions {
  agentOptions?: { identity?: Identity | Promise<Identity> };
}

export declare class ExternalBlob {
  static fromURL(url: string): ExternalBlob;
  getBytes(): Promise<Uint8Array>;
  onProgress?: (progress: number) => void;
}

export declare function createActor(
  canisterId: string,
  uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  options?: CreateActorOptions,
): Promise<backendInterface>;
