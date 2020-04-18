import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTDO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    let totalIncome = 0;
    let totalOutcome = 0;

    this.transactions.map(transaction => {
      if (transaction.type === 'income') {
        totalIncome += transaction.value;
      } else {
        totalOutcome += transaction.value;
      }

      return true;
    });

    const totalGeneral = totalIncome - totalOutcome;

    return { income: totalIncome, outcome: totalOutcome, total: totalGeneral };
  }

  public create({ title, value, type }: CreateTDO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
