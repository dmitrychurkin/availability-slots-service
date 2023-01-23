import type { Edges, Minutes } from "../types";

export interface GenerateSlotsDto {
    readonly edges: Edges;
    readonly span: Minutes;
}
