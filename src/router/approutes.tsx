import AdminLayout from "@templates/adminLayout";
import { Routes, Route, Navigate } from "react-router-dom";
import PreLoginLayout from "@templates/preLoginLayout";
import Banks from "@pages/banks";
import AccountBalances from "@pages/banks/AccountBalances";
import BankPayments from "@pages/banks/BankPayments";
import Receipts from "@pages/banks/Receipts";
import SalesReceipts from "@pages/sales/Receipts";
import Transfers from "@pages/banks/Transfers";
import Reconcile from "@pages/banks/Reconcile";
import AddReconcile from "@pages/banks/AddReconcile";
import Sales from "@pages/sales";
import Invoices from "@pages/sales/Invoices";
import AddSaleInvoice from "@pages/sales/AddSaleInvoice";
import AddCreditInvoice from "@pages/sales/AddCreditInvoice";
import AddBatchInvoice from "@pages/sales/BatchInvoice";
import BulkInvoice from "@pages/sales/BulkInvoice";
import AddSaleInvoiceReceipt from "@pages/sales/AddSaleInvoiceReceipt";
import AddCreditPayment from "@pages/sales/AddCreditPayment";
import ManageReturn from "@pages/sales/ManageReturn";
import BatchSaleReceipt from "@pages/sales/BatchSaleReceipt";
import BatchCreditPayment from "@pages/sales/BatchCreditPayment";
import BatchCombinePayment from "@pages/sales/BatchCombinePayment";
import BatchMakeAllPayment from "@pages/sales/BatchMakeAllPayment";
import PDCR from "@pages/sales/PDCR";
import AddPDCR from "@pages/sales/AddPDCR";
import PostDatedCheques from "@pages/sales/PostDatedCheques";
import DepositPDCR from "@pages/sales/DepositPDCR";
import SalesAll from "@pages/sales/SalesAll";
import Orders from "@pages/sales/Orders";
import AddSaleOrder from "@pages/sales/AddSaleOrder";
import Customers from "@pages/sales/Customers";
import CustomerOpenBal from "@pages/sales/CustomerOpenBal";
import Purchases from "@pages/purchases";
import Bills from "@pages/purchases/bills";
import ExpenseBill from "@pages/purchases/ExpenseBill";
import AddCreditNote from "@pages/purchases/AddCreditNote";
import BatchBills from "@pages/purchases/BatchBills";
import Payments from "@pages/purchases/Payments";
import AddSupplierPayment from "@pages/purchases/AddSupplierPayment";
import AddCreditPaymentPurchase from "@pages/purchases/AddCreditPayment";
import ManageReturnPayment from "@pages/purchases/ManageReturnPayment";
import BatchCreditPaymentPurchase from "@pages/purchases/BatchCreditPaymentPurchase";
import BatchSupplierPayment from "@pages/purchases/BatchSupplierPayment";
import PurchasePostDatedCheques from "@pages/purchases/PurchasePostDatedCheques";
import PurchasePDCR from "@pages/purchases/PurchasePDCR";
import AddPurchasePDCR from "@pages/purchases/AddPurchasePDCR";
import AllPurchases from "@pages/purchases/AllPurchases";
import PurchaseOrders from "@pages/purchases/PurchaseOrders";
import AddPO from "@pages/purchases/AddPO";
import Suppliers from "@pages/purchases/Suppliers";
import SupplierOpenBal from "@pages/purchases/SupplierOpenBal";
import Products from "@pages/inventory/Products";
import Inventory from "@pages/inventory";
import AddProduct from "@pages/inventory/AddNonStockProduct";
import AddNonStockProduct from "@pages/inventory/AddNonStockProduct";
import AddStockProduct from "@pages/inventory/AddStockProduct";
import AddBundleProduct from "@pages/inventory/AddBundleProduct";
import StockAdjustment from "@pages/purchases/StockAdjustment";
import OutAdjustment from "@pages/inventory/OutAdjustment";
import InAdjustment from "@pages/inventory/InAdjustment";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="/login" element={<PreLoginLayout />} />
      <Route path="/dashboard" element={<AdminLayout />}>
        <Route index element={<Navigate to="overview" />} />
        <Route path="banks" element={<Banks />}>
          <Route path="bank-accounts" element={<AccountBalances />} />
          <Route path="bank-payments" element={<BankPayments />} />
          <Route path="bank-receipts" element={<Receipts />} />
          <Route path="bank-transfers" element={<Transfers />} />
          <Route path="bank-reconcile" element={<Reconcile />} />
          <Route path="bank-reconcile-add" element={<AddReconcile />} />
        </Route>
        <Route path="sales" element={<Sales />}>
          <Route path="sales-invoices" element={<Invoices />} />
          <Route path="sale-invoice" element={<AddSaleInvoice />} />
          <Route path="credit-invoice" element={<AddCreditInvoice />} />
          <Route path="batch-invoice" element={<AddBatchInvoice />} />
          <Route path="bulk-invoice" element={<BulkInvoice />} />
          <Route path="receipts" element={<SalesReceipts />} />
          <Route
            path="sale-invoice-receipt"
            element={<AddSaleInvoiceReceipt />}
          />
          <Route path="credit-payment" element={<AddCreditPayment />} />
          <Route path="manage-return" element={<ManageReturn />} />
          <Route path="batch-sale-receipt" element={<BatchSaleReceipt />} />
          <Route path="batch-credit-payment" element={<BatchCreditPayment />} />
          <Route path="combine-payment" element={<BatchCombinePayment />} />
          <Route path="make-all-payment" element={<BatchMakeAllPayment />} />
          <Route path="pdcr" element={<PDCR />} />
          <Route path="add-pdcr" element={<AddPDCR />} />
          <Route path="post-dated-cheques" element={<PostDatedCheques />} />
          <Route path="deposit-pdcr" element={<DepositPDCR />} />
          <Route path="sales-all" element={<SalesAll />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add-sale-order" element={<AddSaleOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="customer-open-bal" element={<CustomerOpenBal />} />
        </Route>
        <Route path="purchases" element={<Purchases />}>
          <Route path="bills" element={<Bills />} />
          <Route path="expense-bill" element={<ExpenseBill/>} />
          <Route path="credit-note" element={<AddCreditNote/>} />
          <Route path="batch-bill" element={<BatchBills/>} />
          <Route path="payments" element={<Payments/>} />
          <Route path="supplier-payment" element={<AddSupplierPayment/>} />
          <Route path="credit-payment" element={<AddCreditPaymentPurchase/>} />
          <Route path="manage-payment" element={<ManageReturnPayment/>} />
          <Route path="batch-supplier-payment" element={<BatchSupplierPayment/>} />
          <Route path="batch-credit-payment" element={<BatchCreditPaymentPurchase/>} />
          <Route path="pdcr" element={<PurchasePDCR />} />
          <Route path="add-pdcr" element={<AddPurchasePDCR />} />
          <Route path="post-dated-cheques" element={<PurchasePostDatedCheques />} />
          <Route path="all" element={<AllPurchases />} />
          <Route path="order" element={<PurchaseOrders />} />
          <Route path="add-po" element={<AddPO />} />
          <Route path="suppliers" element={<Suppliers />} />
          <Route path="supplier-open-Bal" element={<SupplierOpenBal />} />

        </Route>
        <Route path="inventory" element={<Inventory/>} >
         <Route path="products" element={<Products />} />
         <Route path="product/non-stock" element={<AddNonStockProduct />} />
         <Route path="product/stock" element={<AddStockProduct />} />
         <Route path="product/bundle" element={<AddBundleProduct />} />
         <Route path="stock-adjustment" element={<StockAdjustment />} />
         <Route path="out-adjustment" element={<OutAdjustment />} />
         <Route path="in-adjustment" element={<InAdjustment />} />
        </Route>
        <Route path="payments" element={<></>} />
        <Route path="analytics" element={<></>} />
        <Route path="banners" element={<></>} />
        <Route path="subscriptions" element={<></>} />
        <Route path="overview" element={<>Overview Dashboard</>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
