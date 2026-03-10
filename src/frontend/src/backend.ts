// Stub backend — this is a purely frontend project with no Motoko canister.
import type { Identity } from "@icp-sdk/core/agent";
import { HttpAgent } from "@icp-sdk/core/agent";

export interface backendInterface {}

export interface CreateActorOptions {
  agentOptions?: { identity?: Identity | Promise<Identity> };
  agent?: HttpAgent;
  processError?: (e: unknown) => never;
}

export class ExternalBlob {
  static fromURL(_url: string): ExternalBlob {
    return new ExternalBlob();
  }

  async getBytes(): Promise<Uint8Array> {
    return new Uint8Array();
  }

  onProgress?: (progress: number) => void;
}

export async function createActor(
  _canisterId: string,
  _uploadFile: (file: ExternalBlob) => Promise<Uint8Array>,
  _downloadFile: (bytes: Uint8Array) => Promise<ExternalBlob>,
  _options?: CreateActorOptions,
): Promise<backendInterface> {
  return {};
}
