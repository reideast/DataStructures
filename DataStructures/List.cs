using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataStructures
{
    class List<T> : IEnumerable<T> where T : IComparable<T>
    {
        protected ListNode<T> _head;
        protected ListNode<T> _tail;

        public List()
        {
            _head = null; // new ListNode<T>();
            _tail = null;
        }

        public List(params T[] values)
        {
            if (values == null || values.Length == 0)
                throw new ArgumentException("Parameters empty");
            _head = new ListNode<T>(values[0]); //default constructor puts null in Prev and Next
            ListNode<T> prev = _head;
            for (int i = 1; i < values.Length; i++)
            {
                prev.Next = new ListNode<T>(null, prev, values[i]);
                prev = prev.Next;
            }
            _tail = prev;
        }

        public List(IEnumerable<T> values)
        {
            if (values == null || values.Count() == 0)
                throw new ArgumentException("Parameters empty");
            _head = new ListNode<T>(values.ElementAt(0)); //default constructor puts null in Prev and Next
            ListNode<T> prev = _head;
            for (int i = 1; i < values.Count(); i++)
            {
                prev.Next = new ListNode<T>(null, prev, values.ElementAt(i));
                prev = prev.Next;
            }
            _tail = prev;
        }

        public void Append(T value)
        {
            if (_tail == null)
            {
                _head = new ListNode<T>(value);
                _tail = _head;
            }
            else
            {
                ListNode<T> temp = new ListNode<T>(null, _tail, value);
                _tail.Next = temp;
                _tail = temp;
            }
        }

        public void AppendRange(IEnumerable<T> values)
        {
            ListNode<T> first, last;
            createStubList(values, out first, out last);
            if (_tail == null) //empty list
            {
                _head = first;
                _tail = last;
            }
            else
            {
                first.Prev = _tail;
                _tail.Next = first;
                _tail = last;
            }
        }

        public override string ToString()
        {
            StringBuilder data = new StringBuilder();
            ListNode<T> curr = _head;
            while (curr != null)
            {
                data.Append(curr.ToString());
                data.Append(',');
                curr = curr.Next;
            }
            return data.ToString();
        }

        public IEnumerator<T> GetEnumerator()
        {
            ListNode<T> curr = _head;
            while (curr != null)
            {
                yield return curr.Data;
                curr = curr.Next;
            }
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
        }

        public T this[int index]
        {
            get
            {
                int i = 0;
                //foreach (T item in this)
                //    if (i++ == index) return item;
                ListNode<T> curr = _head;
                while (curr != null)
                {
                    if (index == i++)
                        return curr.Data;
                    curr = curr.Next;
                }
                throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
            }
            set
            {

                int i = 0;
                ListNode<T> curr = _head;
                while (curr != null)
                {
                    if (index == i++)
                    {
                        curr.Data = value;
                        return;
                    }
                    curr = curr.Next;
                }
                throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
            }
        }

        public int Length
        {
            get
            {
                int count = 0;
                ListNode<T> curr = _head;
                while (curr != null)
                {
                    count++;
                    curr = curr.Next;
                }
                return count;
            }
        }

        public int Count()
        {
            return this.Length;
        }

        public T ElementAt(int index)
        {
            int i = 0;
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (i == index)
                    return curr.Data;
                i++;
                curr = curr.Next;
            }
            throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
        }

        public int IndexOf(T value)
        {
            int i = 0;
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (curr.Data.Equals(value))
                    return i;
                i++;
                curr = curr.Next;
            }
            return -1;
        }

        public void Insert(int index, T newValue)
        {
            int i = 0;
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (i == index)
                {
                    ListNode<T> newNode = new ListNode<T>(curr, curr.Prev, newValue);
                    if (curr == _head)
                        _head = newNode;
                    else
                        curr.Prev.Next = newNode;
                    curr.Prev = newNode;

                    return;
                }
                i++;
                curr = curr.Next;
            }

            if (i == index) //allow inserting one after Length
                this.Append(newValue);
            else
                throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
        }

        public void InsertRange(int index, IEnumerable<T> values)
        {
            if (values == null || values.Count() == 0)
                throw new ArgumentException("Values to insert are empty");

            int i = 0;
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (i == index)
                {
                    ListNode<T> first, last;
                    createStubList(values, out first, out last);
                    if (curr == _head)
                    {
                        //first.Prev = null; //already done on creation
                        last.Next = _head;
                        _head.Prev = last;
                        _head = first;
                    }
                    else
                    {
                        curr.Prev.Next = first;
                        first.Prev = curr.Prev;
                        last.Next = curr;
                        curr.Prev = last;
                    }
                    return;
                }
                i++;
                curr = curr.Next;
            }

            if (i == index) //allow inserting one after Length
                this.AppendRange(values);
            else
                throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
        }

        private void createStubList(IEnumerable<T> values, out ListNode<T> first, out ListNode<T> last)
        {
            first = new ListNode<T>(values.ElementAt(0)); //default constructor puts null in Prev and Next
            ListNode<T> prev = first;
            for (int i = 1; i < values.Count(); i++)
            {
                prev.Next = new ListNode<T>(null, prev, values.ElementAt(i));
                prev = prev.Next;
            }
            last = prev;
        }

        public void Insert(int index, params T[] values)
        {
            this.InsertRange(index, values);
        }
        
        public void Remove(T value) //removes first occurrence
        {
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (curr.Data.Equals(value))
                {
                    if (curr == _head)
                        _head = curr.Next;
                    else
                        curr.Prev.Next = curr.Next;
                    if (curr == _tail)
                        _tail = curr.Prev;
                    else
                        curr.Next.Prev = curr.Prev;
                    curr.Next = null;
                    curr.Prev = null;
                    //garbage will be collected

                    return; //remove this break statement to be greedy
                }
                curr = curr.Next;
            }
        }

        public T RemoveAt(int index)
        {
            int i = 0;
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (i == index)
                {
                    T data = curr.Data;
                    if (curr == _head)
                        _head = curr.Next;
                    else
                        curr.Prev.Next = curr.Next;
                    if (curr == _tail)
                        _tail = curr.Prev;
                    else
                        curr.Next.Prev = curr.Prev;
                    curr.Next = null;
                    curr.Prev = null;
                    //garbage will be collected

                    return data;
                }
                i++;
                curr = curr.Next;
            }
            throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
        }

        public void Sort()
        {
            if (_head != null)
                this.quickSort(_head, _tail);
            //this will go infinite if there is a loop or if _head and _tail are not correct
        }

        private void quickSort(ListNode<T> start, ListNode<T> end)
        {
            /*
            https://en.wikipedia.org/wiki/Quicksort
            quicksort(A, lo, hi)
              if lo < hi
                p = partition(A, lo, hi)
                quicksort(A, lo, p - 1)
                quicksort(A, p + 1, hi)

            partition(A, lo, hi)
                pivot = A[hi]
                i = lo #place for swapping
                for j = lo to hi - 1
                    if A[j] <= pivot
                        swap A[i] with A[j]
                        i = i + 1
                swap A[i] with A[hi]
                return i
            */


            if (start != end)
            {
                ListNode<T> partitionNode = quickSortPartition(start, end);

                //smallest data structure that can enter this block is 2
                //n=2: partition must be either start or end, and start..end are now sorted
                //     calls quick sort on either start..start or end..end and terminates quickly with no extra tests
                //n=3: partition into 2 & 1 (2 could be unsorted, but 1 & [2] are sorted to each other
                //     if partitionNode == start or end, this if..else if properly calls quicksort on the 2 items only
                //     if partitionNode is middle item, calls quicksort on start..start and end..end and both terminate quickly
                //n=4: 3&1, 2&2 - shown
                //n>4: (n-1)&1, (n-2)&2, (n-3)&3 - shown; (n-x)&(n-y) - terminates to 2 or 1

                //start cannot == end due to above condition
                //this if..else block prevents start < end, and allows above if (start != end) with no other conditions
                if (partitionNode == end)
                {
                    quickSort(start, partitionNode.Prev);
                }
                else if (partitionNode == start)
                {
                    quickSort(partitionNode.Next, end);
                }
                else
                {
                    quickSort(start, partitionNode.Prev);
                    quickSort(partitionNode.Next, end);
                }
                //quickSort(indexStart, partitionIndex - 1);
                //quickSortRecursive(partitionIndex + 1, indexEnd);
            }
        }

        private ListNode<T> quickSortPartition(ListNode<T> start, ListNode<T> end)
        {
            /*
            partition(A, lo, hi)
                pivot = A[hi]
                i = lo #place for swapping
                for j = lo to hi - 1
                    if A[j] <= pivot
                        swap A[i] with A[j]
                        i = i + 1
                swap A[i] with A[hi]
                return i
            */

            //if (end == null || start == null) //this is a useless test due to conditionals in quickSort()
            //{
            //    throw new ArgumentNullException();
            //}

            //if (start == end) //we do not need this, since quickSortPartition will only be called when start < end
            //{
            //    return start;
            //}

            T temp;
            T pivotDatum = end.Data; //TODO: since this could be a reference type, is there the possibility that this reference could change? // save the data magnitude we are using for pivot in a temporary variable (last point chosen as pivotDatum is per "Lomuto partition scheme")
            ListNode<T> currPivotNode = start; // index that will become our actual halfway point (all data less than pivotDatum will go before halfway point)
            ListNode<T> currNode = start;
            while (currNode != end) //for (int i = indexStart; i <= indexEnd - 1; i++) // from indexStart to one less than index of pivotDatum
            {
                if (currNode.Data.CompareTo(pivotDatum) <= 0)
                {
                    // data in currNode and the current pivot point
                    temp = currPivotNode.Data;
                    currPivotNode.Data = currNode.Data;
                    currNode.Data = temp;

                    currPivotNode = currPivotNode.Next;
                }

                currNode = currNode.Next;
            }
            // swap pivotDatum into the actual pivot index
            //temp = data[indexEnd];
            end.Data = currPivotNode.Data;
            currPivotNode.Data = pivotDatum;

            return currPivotNode; //inform quick sort we have decided on a pivot index
        }
        
        public bool Contains(T value)
        {
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (curr.Data.Equals(value))
                    return true;
                curr = curr.Next;
            }
            return false;
        }

        public bool isEmpty()
        {
            return (_head == null);
        }
    }
}
