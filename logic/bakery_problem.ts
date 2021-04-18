export class Customer {

    static readonly PAN = 'P'
    static readonly ROUND = 'R'

    static readonly SORT_BY_TYPE_AND_AMOUNT = (a: Customer, b: Customer): number => {
        if (a.type === Customer.ROUND && b.type === Customer.PAN) {
            return -1
        }

        if (a.type === Customer.PAN && b.type === Customer.ROUND) {
            return 1
        }

        return a.amount - b.amount
    }

    constructor(
        private _amount: number,
        private _type?: string,
        private _unique?: boolean
    ) { }

    get amount(): number {
        return this._amount
    }

    get type(): string | undefined {
        return this._type
    }

    get unique(): boolean | undefined {
        return this._unique
    }

    set amount(value: number) {
        this._amount = value
    }

    set type(value: string | undefined) {
        this._type = value
    }

    set unique(value: boolean | undefined) {
        this._unique = value
    }
}

export class Request {

    constructor(private _nAmount: number, private _customers: Customer[][]) { }

    get nAmount() {
        return this._nAmount
    }

    get customers() {
        return this._customers
    }
}

export interface IData {
    amount: number;
    customers: Customer[][];
}

export function parseInputData(content: IData): Request {
    const nAmount = content.amount;

    const customers = content.customers.map((arr: Customer[]) => {
        return arr.map((pref: Customer) => {
            return new Customer(pref.amount, pref.type)
        })
    })

    return new Request(nAmount, customers)
}

export function getResult(request: Request): string {
    const sortedData = sortData(request.customers)
    const customers = generateSolutions(sortedData)

    for (let customer of customers) {
        const solution = validate(request.nAmount, customer, sortedData)
        if (solution) {
            return solution
        }
    }

    return 'No solution exists. Please call to Help canter and we can help you))'
}


export function sortData(customers: Customer[][]): Customer[][] {
    return customers
        .map((prefs: Customer[]) => prefs.sort(Customer.SORT_BY_TYPE_AND_AMOUNT))
        .map((prefs: Customer[]) => {
            prefs[0].unique = (prefs.length === 1) ? true : undefined
            return prefs
        })
}

function* combine (head: Customer[], ...tail: Customer[]): IterableIterator<Customer[]> {
    const rest = tail.length ? combine(...tail) : [[]]
    for (const r of rest) {
        for (const h of head) {
            yield [h, ...r]
        }
    }
}

function* generateSolutions (customers: Customer[][]): IterableIterator<Customer[]> {
    const candidates = combine(...customers);
    for (const candidate of candidates) {
        yield candidate
    }
}


export function validate(nAmount: number, candidate: Customer[], customers: Customer[][]): any {
    const breads = new Array(nAmount).fill(null);

    const found = candidate.every((cust: Customer) => {
        const currCust: Customer = breads[cust.amount - 1];

        if (currCust && (currCust._unique || cust.unique) && currCust._type !== cust.type) {
            return false
        }

        breads[cust.amount - 1] = Object.assign({}, breads[cust.amount - 1], cust)

        return true
    });

    if (!found) {
        return false
    }

    const result = breads
        .map((c: any, i: number) => c || ({ _amount: i + 1, _type: Customer.ROUND }))
        .map((c: any) => c._type);

    if (customers.every((custs: Customer[]) => custs.some((cust: Customer) => result[cust.amount - 1] === cust.type))) {
        return result.join(' ')
    }

    return false
}
