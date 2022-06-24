import React from 'react';
import { Button } from '@mui/material';
import { LoginForm } from 'components/LoginForm.component';
import { RegisterForm } from 'components/RegisterForm.component';

interface Props {
  formType: boolean;
  toggleFormType: () => void;
}

export const Authentication: React.FC<Props> = ({
  formType,
  toggleFormType,
}) => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            {formType ? (
              <>
                <h1>New Customer</h1>
                <p>
                  Proinde concepta rabie saeviore, quam desperatio incendebat et
                  fames, amplificatis viribus ardore incohibili in excidium
                  urbium matris Seleuciae efferebantur, quam comes tuebatur
                  Castricius tresque legiones bellicis sudoribus induratae.
                </p>
              </>
            ) : (
              <>
                <h1>Welcome Back</h1>
                <p>
                  Ut enim benefici liberalesque sumus, non ut exigamus gratiam
                  (neque enim beneficium faeneramur sed natura propensi ad
                  liberalitatem sumus), sic amicitiam non spe mercedis adducti
                  sed quod omnis eius fructus in ipso amore inest, expetendam
                  putamus. Proinde concepta rabie saeviore, quam desperatio
                  incendebat et fames, amplificatis viribus ardore incohibili in
                  excidium urbium matris Seleuciae efferebantur, quam comes
                  tuebatur Castricius tresque legiones bellicis sudoribus
                  induratae.
                </p>
              </>
            )}
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={() => toggleFormType()}
            >
              {formType ? 'Already register ?' : 'Need to register ?'}
            </Button>
          </div>
          <div className="right">
            {formType ? (
              <>
                <h2>Register</h2>
                <RegisterForm formType={formType} />
              </>
            ) : (
              <>
                <h2>Login</h2>
                <LoginForm formType={formType} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
