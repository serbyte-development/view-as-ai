export interface ViewAsAIResult {
  url: string;
  text: string;
  urls: Record<string, string>;
  title: string;
}

export interface ViewAsAIOptions {
  markdownLinks?: boolean;
  timeout?: number;
  maxBuffer?: number;
  signal?: AbortSignal;
  binaryPath?: string;
}

export declare function viewAsAI(
  source: string,
  options?: ViewAsAIOptions,
): Promise<ViewAsAIResult>;

export declare function prepareBinary(): Promise<string>;
