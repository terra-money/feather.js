const escape = (str: string) => str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");

export class TendermintQuery {
  private _query: string[] = [];

  getValue(value: number | string | Date) {
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      return `'${escape(value)}'`;
    } else {
      return value.toISOString();
    }
  }

  exact(field: string, value: number | string | Date) {
    this._query.push(`${field}=${this.getValue(value)}`);
    return this;
  }

  compare(field: string, op: `${'<' | '>'}${'' | '='}`, value: number | Date) {
    this._query.push(`${field}${op}${this.getValue(value)}`);
    return this;
  }

  exists(field: string) {
    this._query.push(`${field} EXISTS`);
    return this;
  }

  contains(field: string, value: string) {
    this._query.push(`${field} CONTAINS '${escape(value)}'`);
    return this;
  }

  clone() {
    const q = new TendermintQuery();
    q._query = this._query.slice();
    return q;
  }

  toString() {
    return this._query.join(' AND ');
  }

  static AND(lhs: TendermintQuery, rhs: TendermintQuery) {
    const q = new TendermintQuery();
    q._query.push(`(${lhs}) AND (${rhs})`);
    return q;
  }

  static OR(lhs: TendermintQuery, rhs: TendermintQuery) {
    const q = new TendermintQuery();
    q._query.push(`(${lhs}) OR (${rhs})`);
    return q;
  }
}
