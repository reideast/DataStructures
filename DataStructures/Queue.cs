using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStructures
{
    class Queue<T> : List<T> where T : IComparable<T>
    {
        public Queue() : base() { }
        public Queue(IEnumerable<T> values) : base(values) { }
        public Queue(params T[] values) : base(values) { }


        public void push(T value)
        {
            this.Insert(0, value);
        }
        public void enqueue(T value)
        {
            this.Insert(0, value);
        }

        public T pop()
        {
            if (_tail != null)
            {
                T data = _tail.Data;
                _tail.Prev.Next = null;
                _tail = _tail.Prev;
                return data;
            }
            else
            {
                throw new NullReferenceException("Queue is empty.");
            }
        }
        public T dequeue()
        {
            return this.pop();
        }
    }
}
