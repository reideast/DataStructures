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
        private ListNode<T> _head;
        private ListNode<T> _tail;

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
                curr = curr.Next;
            }
            return data.ToString();
        }

        public IEnumerator<T> GetEnumerator()
        {
            throw new NotImplementedException();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            throw new NotImplementedException();
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

        //public void Insert(int index, params T[] values)
        //{
        //    if (values == null || values.Count() == 0)
        //        throw new ArgumentException("Values to insert are empty");

        //    int i = 0;
        //    ListNode<T> curr = _head;
        //    while (curr != null)
        //    {
        //        if (i == index)
        //        {
        //            ListNode<T> first, last;
        //            //createStubList(values, out first, out last);
        //            first = new ListNode<T>(values[0]); //default constructor puts null in Prev and Next
        //            ListNode<T> prev = first;
        //            for (int j = 1; j < values.Length; j++)
        //            {
        //                prev.Next = new ListNode<T>(null, prev, values[j]);
        //                prev = prev.Next;
        //            }
        //            last = prev;

        //            if (curr == _head)
        //            {
        //                //first.Prev = null; //already done on creation
        //                last.Next = _head;
        //                _head.Prev = last;
        //                _head = first;
        //            }
        //            else
        //            {
        //                curr.Prev.Next = first;
        //                first.Prev = curr.Prev;
        //                last.Next = curr;
        //                curr.Prev = last;
        //            }
        //            return;
        //        }
        //        i++;
        //        curr = curr.Next;
        //    }

        //    if (i == index) //allow inserting one after Length
        //        this.AppendRange(values);
        //    else
        //        throw new IndexOutOfRangeException(String.Format("Index {0} out of range.", index));
        //}
        
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

        public void RemoveAt(int index)
        {
            int i = 0;
            ListNode<T> curr = _head;
            while (curr != null)
            {
                if (i == index)
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

                    return;
                }
                i++;
                curr = curr.Next;
            }
        }

        public void Sort()
        {

        }

        private void SortDataQuick(ref int[] data, ref SolidColorBrush[] colors)
        {
            quickSortRecursive(0, data.Length - 1, ref data, ref colors);

            for (int i = 0; i < data.Length; i++)
                colors[i] = violet;
            this.Dispatcher.Invoke((Action)(() => syncRectanglesToData()), System.Windows.Threading.DispatcherPriority.Render);
            this.Dispatcher.Invoke((Action)(() => { QuickSort.IsEnabled = true; }));

        }

        private void quickSortRecursive(int indexStart, int indexEnd, ref int[] dataSlice, ref SolidColorBrush[] colors)
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

            //show what range is being tested in this recursion
            for (int i = indexStart; i <= indexEnd; i++)
                colors[i] = blue;
            this.Dispatcher.Invoke((Action)(() => syncRectanglesToData()), System.Windows.Threading.DispatcherPriority.Render);
            Thread.Sleep(ANIMATION_DELAY);

            if (indexStart < indexEnd)
            {
                int partitionIndex = quickSortPartition(indexStart, indexEnd, ref data, ref colors); //partitioning is where the swapping takes place
                for (int i = indexStart; i <= indexEnd; i++)
                    colors[i] = violet;
                quickSortRecursive(indexStart, partitionIndex - 1, ref data, ref colors);
                quickSortRecursive(partitionIndex + 1, indexEnd, ref data, ref colors);
            }
        }

        private int quickSortPartition(int indexStart, int indexEnd, ref int[] data, ref SolidColorBrush[] colors)
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
            int temp;
            int pivotDatum = data[indexEnd]; // save the data magnitude we are using for pivot in a temporary variable (last point chosen as pivotDatum is per "Lomuto partition scheme")
            colors[indexEnd] = green;
            int currPivotIndex = indexStart; // index that will become our actual halfway point (all data less than pivotDatum will go before halfway point)
            for (int i = indexStart; i <= indexEnd - 1; i++) // from indexStart to one less than index of pivotDatum
            {
                colors[i] = green;
                this.Dispatcher.Invoke((Action)(() => syncRectanglesToData()), System.Windows.Threading.DispatcherPriority.Render);
                Thread.Sleep(ANIMATION_DELAY);

                if (data[i] <= pivotDatum)
                {
                    colors[currPivotIndex] = green;
                    // swap data[j] and data[currPivotIndex]
                    temp = data[currPivotIndex];
                    data[currPivotIndex] = data[i];
                    data[i] = temp;

                    this.Dispatcher.Invoke((Action)(() => syncRectanglesToData()), System.Windows.Threading.DispatcherPriority.Render);
                    Thread.Sleep(ANIMATION_DELAY);
                    colors[currPivotIndex] = blue;

                    currPivotIndex++;
                }

                colors[i] = blue;
            }
            // swap pivotDatum into the actual pivot index
            //temp = data[indexEnd];
            data[indexEnd] = data[currPivotIndex];
            data[currPivotIndex] = pivotDatum; //temp

            return currPivotIndex; //inform quick sort we have decided on a pivot index
        }

        /*
        theirList.Sort();
        */

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
    }

    class ListNode<T>
    {
        private ListNode<T> _next;
        public ListNode<T> Next { get; set; }
        private ListNode<T> _prev;
        public ListNode<T> Prev { get; set; }
        private T _data;
        public T Data { get; set; }

        public ListNode()
        {
            _next = null;
            _prev = null;
            _data = default(T);
        }

        public ListNode(T data)
        {
            _next = null;
            _prev = null;
            _data = data;
        }

        public ListNode(ListNode<T> next, ListNode<T> prev, T data)
        {
            _next = next;
            _prev = prev;
            _data = data;
        }

        public override string ToString()
        {
            return _data.ToString();
        }
    }
}
