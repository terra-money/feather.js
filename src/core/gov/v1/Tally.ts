import { Int } from '../../../core/numeric';

export interface Tally {
  yes_count: Int;
  no_count: Int;
  abstain_count: Int;
  no_with_veto_count: Int;
}

export namespace Tally {
  export interface Data {
    yes_count: string;
    no_count: string;
    abstain_count: string;
    no_with_veto_count: string;
  }
}
