import { ulid } from 'ulid';

export default function incidentIdGenerator(): string {
  return `INC-${ulid()}`;
}
